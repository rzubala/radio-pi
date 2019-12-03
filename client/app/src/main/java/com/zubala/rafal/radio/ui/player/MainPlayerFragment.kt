package com.zubala.rafal.radio.ui.player

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProviders
import com.zubala.rafal.radio.R
import com.zubala.rafal.radio.databinding.MainPlayerBinding

class MainPlayerFragment : Fragment() {
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        val binding: MainPlayerBinding = DataBindingUtil.inflate(inflater, R.layout.main_player, container, false)

        val application = requireNotNull(this.activity).application

        val viewModelFactory = MainPlayerViewModelFactory(application)

        val mainPlayerViewModel = ViewModelProviders.of(this, viewModelFactory).get(MainPlayerViewModel::class.java)

        binding.stop.setOnClickListener {
            Log.i("Pi", "STOP")
            mainPlayerViewModel.stop()
        }

        binding.play.setOnClickListener {
            Log.i("Pi", "PLAY")
            mainPlayerViewModel.play()
        }

        return binding.root
    }
}