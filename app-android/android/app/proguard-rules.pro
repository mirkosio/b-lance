# google_mlkit_text_recognition referenzia le opzioni per tutte le lingue,
# ma nel bundle servono solo quelle latine. R8 le toglie e poi non le trova:
# teniamo il namespace per evitare il fail in fase di minify.
-keep class com.google.mlkit.vision.text.** { *; }
-dontwarn com.google.mlkit.vision.text.chinese.**
-dontwarn com.google.mlkit.vision.text.devanagari.**
-dontwarn com.google.mlkit.vision.text.japanese.**
-dontwarn com.google.mlkit.vision.text.korean.**
