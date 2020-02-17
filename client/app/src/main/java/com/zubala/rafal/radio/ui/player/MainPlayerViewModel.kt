package com.zubala.rafal.radio.ui.player

import android.app.Application
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
                PlayerApi.retrofitService.getStop()
            }
        }
    }

    fun play() {
        viewModelScope.launch {
            withContext(Dispatchers.IO) {
                PlayerApi.retrofitService.getPlay()
            }
        }
    }

    fun shutdown() {
        viewModelScope.launch {
            withContext(Dispatchers.IO) {
                PlayerApi.retrofitService.getShutdown()
            }
        }
    }

    fun restart() {
        viewModelScope.launch {
            withContext(Dispatchers.IO) {
                PlayerApi.retrofitService.getRestart()
            }
        }
    }
}