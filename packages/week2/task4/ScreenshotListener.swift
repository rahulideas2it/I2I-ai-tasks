import Foundation
import Capacitor
import UIKit

private class SecureField: UITextField {
    override init(frame: CGRect) {
        super.init(frame: .zero)
        isSecureTextEntry = true
        translatesAutoresizingMaskIntoConstraints = false
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    var secureContainer: UIView? {
        return subviews.first {
            String(describing: type(of: $0)).contains("CanvasView")
        }.map {
            $0.translatesAutoresizingMaskIntoConstraints = false
            return $0
        }
    }

    override var canBecomeFirstResponder: Bool { false }
    override func becomeFirstResponder() -> Bool { false }
}

@objc public class UIAudit: NSObject {
    private var screenshotObserver: NSObjectProtocol?
    private var copyObserver: NSObjectProtocol?
    private var isSecured = false
    private var rootViewSubviews: [UIView] = []

    @objc public func initializeScreenshotListener(plugin: CAPPlugin, call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard !self.isSecured,
                  let rootView = plugin.bridge?.viewController?.view else {
                call.resolve(["status": "Already secured"])
                return
            }

            let secureField = SecureField()
            guard let secureView = secureField.secureContainer else {
                call.reject("Secure canvas unavailable")
                return
            }

            let existingSubviews = rootView.subviews
            self.rootViewSubviews = existingSubviews
            existingSubviews.forEach { subview in
                subview.removeFromSuperview()
                secureView.addSubview(subview)
                subview.frame = secureView.bounds
                subview.autoresizingMask = [.flexibleWidth, .flexibleHeight]
            }

            rootView.addSubview(secureView)
            secureView.frame = rootView.bounds
            secureView.autoresizingMask = [.flexibleWidth, .flexibleHeight]

            self.isSecured = true

            self.screenshotObserver = NotificationCenter.default.addObserver(
                forName: UIApplication.userDidTakeScreenshotNotification,
                object: nil,
                queue: .main
            ) { _ in
                plugin.notifyListeners("onScreenShot", data: ["platform": "ios"])
            }

            call.resolve(["status": "Secure mode enabled"])
        }
    }

    @objc public func destroyScreenshotListener(call: CAPPluginCall) {
        DispatchQueue.main.async {
            if let observer = self.screenshotObserver {
                NotificationCenter.default.removeObserver(observer)
                self.screenshotObserver = nil
            }
            self.isSecured = false
            call.resolve(["status": "Secure mode disabled"])
        }
    }

  @objc public func initializeClipboardListener(plugin: CAPPlugin, call: CAPPluginCall) {
      DispatchQueue.main.async {
          if self.copyObserver != nil {
              call.resolve(["status": "Already listening for clipboard changes"])
              return
          }
          self.copyObserver = NotificationCenter.default.addObserver(
              forName: UIPasteboard.changedNotification,
              object: nil,
              queue: .main
          ) { _ in
              let pasteboard = UIPasteboard.general
              var copiedValue = ""
              var copiedType: String = "unknown"

              if let string = pasteboard.string {
                  copiedValue = string
                  copiedType = "text"
              } else if let url = pasteboard.url?.absoluteString {
                  copiedValue = url
                  copiedType = "uri"
              } else if let image = pasteboard.image {
                  copiedValue = "<image>"
                  copiedType = "image"
              }

              plugin.notifyListeners("onCopy", data: [
                  "platform": "ios",
                  "value": copiedValue,
                  "type": copiedType
              ])
          }

          call.resolve(["status": "Listening for clipboard changes"])
      }
  }

    @objc public func destroyClipboardListener(call: CAPPluginCall) {
        DispatchQueue.main.async {
            if let observer = self.copyObserver {
                NotificationCenter.default.removeObserver(observer)
                self.copyObserver = nil
            }
            call.resolve(["status": "Stopped listening for clipboard changes"])
        }
    }

    @objc public func enableSecureView(plugin: CAPPlugin, call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard !self.isSecured,
                  let rootView = plugin.bridge?.viewController?.view else {
                call.resolve(["status": "Already secured"])
                return
            }

            let secureField = SecureField()
            guard let secureView = secureField.secureContainer else {
                call.reject("Secure canvas unavailable")
                return
            }

            let existingSubviews = rootView.subviews
            self.rootViewSubviews = existingSubviews
            existingSubviews.forEach { subview in
                subview.removeFromSuperview()
                secureView.addSubview(subview)
                subview.frame = secureView.bounds
                subview.autoresizingMask = [.flexibleWidth, .flexibleHeight]
            }

            rootView.addSubview(secureView)
            secureView.frame = rootView.bounds
            secureView.autoresizingMask = [.flexibleWidth, .flexibleHeight]

            self.isSecured = true
            call.resolve(["status": "Secure View enabled"])
        }
    }

    @objc public func disableSecureView(call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard self.isSecured,
                  let rootView = UIApplication.shared.windows.first?.rootViewController?.view else {
                call.resolve(["status": "Already disabled"])
                return
            }

            self.rootViewSubviews.forEach { subview in
                rootView.addSubview(subview)
                subview.frame = rootView.bounds
                subview.autoresizingMask = [.flexibleWidth, .flexibleHeight]
            }

            self.isSecured = false
            call.resolve(["status": "Secure View disabled"])
        }
    }
}
