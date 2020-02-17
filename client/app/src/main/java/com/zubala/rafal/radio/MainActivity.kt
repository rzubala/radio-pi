package com.zubala.rafal.radio

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.microsoft.appcenter.AppCenter
import com.microsoft.appcenter.analytics.Analytics
import com.microsoft.appcenter.crashes.Crashes
import com.microsoft.appcenter.distribute.Distribute


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        AppCenter.start(
            application, "9caf02fd-bb75-42b4-94e6-29834fdd60d5",
            Distribute::class.java, Analytics::class.java, Crashes::class.java
        )

        Distribute.setEnabled(true)
        Distribute.setEnabledForDebuggableBuild(false)
    }
}
