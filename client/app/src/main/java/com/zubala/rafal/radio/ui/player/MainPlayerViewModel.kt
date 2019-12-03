package com.zubala.rafal.radio.ui.player

import android.app.Application
import android.util.Log
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.zubala.rafal.radio.network.PlayerApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MainPlayerViewModel(application: Application) : AndroidViewModel(application) {
    fun stop() {
        viewModelScope.launch {
            withContext(Dispatchers.IO) {
                Log.i("PI ViewModel", "STOP")
                PlayerApi.retrofitService.getStop()
            }
        }
    }

    fun play() {
        viewModelScope.launch {
            withContext(Dispatchers.IO) {
                Log.i("PI ViewModel", "PLAY")
                PlayerApi.retrofitService.getPlay()
            }
        }
    }
}