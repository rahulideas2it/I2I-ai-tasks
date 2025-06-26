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
