cd /usr/share/app/mobile-owner/android

./gradlew assembleRelease

cd app/build/outputs/apk/release/

mv app-release.apk /var/lib/shared/client.apk