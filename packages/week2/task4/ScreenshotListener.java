package com.example.uiaudit;

import android.content.Context;
import android.database.ContentObserver;
import android.database.Cursor;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.provider.MediaStore;
import android.util.Log;

public class ScreenshotObserver {
    public interface ScreenshotListener {
        void onScreenshotDetected(String fileName);
    }

    private final Context context;
    private final ScreenshotListener listener;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private ContentObserver contentObserver;

    private String lastScreenshotPath = "";
    private long lastScreenshotTime = 0;

    public ScreenshotObserver(Context context, ScreenshotListener listener) {
        this.context = context;
        this.listener = listener;
    }

    public void start() {
        contentObserver = new ContentObserver(handler) {
            @Override
            public void onChange(boolean selfChange, Uri uri) {
                super.onChange(selfChange, uri);
                checkIfScreenshot(uri);
            }
        };

        context.getContentResolver().registerContentObserver(
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
            true,
            contentObserver
        );
    }

    public void stop() {
        if (contentObserver != null) {
            context.getContentResolver().unregisterContentObserver(contentObserver);
            contentObserver = null;
        }
    }

    private void checkIfScreenshot(Uri uri) {
        try (Cursor cursor = context.getContentResolver().query(
            uri,
            new String[]{
                MediaStore.Images.Media.DISPLAY_NAME,
                MediaStore.Images.Media.RELATIVE_PATH,
                MediaStore.Images.Media.DATE_ADDED
            },
            null,
            null,
            MediaStore.Images.Media.DATE_ADDED + " DESC LIMIT 1"
        )) {
            if (cursor != null && cursor.moveToFirst()) {
                String fileName = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DISPLAY_NAME));
                String path = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.RELATIVE_PATH));
                long timestamp = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATE_ADDED));

                if (path != null && path.toLowerCase().contains("screenshot")) {
                    if (!fileName.equals(lastScreenshotPath) || timestamp > lastScreenshotTime) {
                        lastScreenshotPath = fileName;
                        lastScreenshotTime = timestamp;
                        listener.onScreenshotDetected(fileName);
                    }
                }
            }
        } catch (Exception e) {
            Log.e("ScreenshotObserver", "Error checking for screenshot", e);
        }
    }
}
