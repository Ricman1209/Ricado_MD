package com.example.weatherapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

public class DetailActivity extends AppCompatActivity {

    private TextView tvDetail;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        tvDetail = new TextView(this);
        tvDetail.setPadding(32, 32, 32, 32);
        tvDetail.setTextSize(18f);
        setContentView(tvDetail);

        // VALIDACIÓN: recuperar extras con valores por defecto
        String city = getIntent().getStringExtra(MainActivity.EXTRA_CITY);
        String desc = getIntent().getStringExtra(MainActivity.EXTRA_DESC);
        double temp = getIntent().getDoubleExtra(MainActivity.EXTRA_TEMP, Double.NaN);
        int hum = getIntent().getIntExtra(MainActivity.EXTRA_HUM, -1);
        double wind = getIntent().getDoubleExtra(MainActivity.EXTRA_WIND, Double.NaN);
        double lat = getIntent().getDoubleExtra(MainActivity.EXTRA_LAT, Double.NaN);
        double lon = getIntent().getDoubleExtra(MainActivity.EXTRA_LON, Double.NaN);

        StringBuilder sb = new StringBuilder();
        sb.append("Detalle del clima\n\n");
        sb.append("Ciudad: ").append(city != null ? city : "—").append("\n");
        if (!Double.isNaN(temp)) sb.append("Temperatura: ").append(Math.round(temp)).append(" °C\n");
        if (desc != null) sb.append("Descripción: ").append(desc).append("\n");
        if (hum >= 0) sb.append("Humedad: ").append(hum).append(" %\n");
        if (!Double.isNaN(wind)) sb.append("Viento: ").append(wind).append(" m/s\n");
        if (!Double.isNaN(lat) && !Double.isNaN(lon)) {
            sb.append("Coordenadas: ").append(lat).append(", ").append(lon).append("\n");
        }
        tvDetail.setText(sb.toString());
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
    }
}
