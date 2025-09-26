package com.example.weatherapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

public class AboutActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        TextView tv = new TextView(this);
        tv.setPadding(32,32,32,32);
        tv.setTextSize(18f);
        tv.setText("WeatherApp\n\nEjemplo básico con Intents (explícitos e implícitos), Extras, animaciones y validaciones.\nAPI: OpenWeatherMap");
        setContentView(tv);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
    }
}
