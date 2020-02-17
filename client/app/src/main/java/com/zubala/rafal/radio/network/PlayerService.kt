package com.zubala.rafal.radio.network

import com.jakewharton.retrofit2.adapter.kotlin.coroutines.CoroutineCallAdapterFactory
import kotlinx.coroutines.Deferred
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET

private const val BASE_URL = "http://192.168.0.3:3000/"

private val retrofit = Retrofit.Builder()
    .addConverterFactory(GsonConverterFactory.create())
    .addCallAdapterFactory(CoroutineCallAdapterFactory())
    .baseUrl(BASE_URL)
    .build()

interface PlayerApiService {
    @GET("stop")
    fun getStop(): Deferred<String>

    @GET("play")
    fun getPlay(): Deferred<String>

    @GET("shutdown")
    fun getShutdown(): Deferred<String>

    @GET("restart")
    fun getRestart(): Deferred<String>
}

object PlayerApi {
    val retrofitService : PlayerApiService by lazy { retrofit.create(PlayerApiService::class.java) }
}