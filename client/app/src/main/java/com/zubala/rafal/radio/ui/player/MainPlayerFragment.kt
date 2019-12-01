package com.zubala.rafal.radio.ui.player

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.zubala.rafal.radio.R
import com.zubala.rafal.radio.databinding.MainPlayerBinding

class MainPlayerFragment : Fragment() {
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        val binding: MainPlayerBinding = DataBindingUtil.inflate(inflater, R.layout.main_player, container, false)

        return binding.root
    }
}