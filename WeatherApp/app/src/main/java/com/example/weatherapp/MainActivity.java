package com.example.weatherapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URLEncoder;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class MainActivity extends AppCompatActivity {

    private EditText etCity;
    private TextView tvResult;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        etCity = findViewById(R.id.etCity);
        tvResult = findViewById(R.id.tvResult);
        Button btnFetch = findViewById(R.id.btnFetch);

        btnFetch.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) {
                String city = etCity.getText().toString().trim();
                if (city.isEmpty()) city = "Veracruz"; // valor por defecto, opcional
                fetchWeather(city);
            }
        });
    }

    private void fetchWeather(String city) {
        tvResult.setText("Cargando...");
        final String API_KEY = getString(R.string.openweather_key);

        new Thread(() -> {
            HttpURLConnection conn = null;
            try {
                String cityParam = URLEncoder.encode(city, "UTF-8");
                String urlStr = "https://api.openweathermap.org/data/2.5/weather?q="
                        + cityParam + "&appid=" + API_KEY + "&units=metric&lang=es";

                URL url = new URL(urlStr);
                conn = (HttpURLConnection) url.openConnection();
                conn.setConnectTimeout(10000);
                conn.setReadTimeout(10000);
                conn.setRequestMethod("GET");

                int code = conn.getResponseCode();
                InputStream is = (code >= 200 && code < 300) ? conn.getInputStream() : conn.getErrorStream();

                BufferedReader br = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8));
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) sb.append(line);
                br.close();

                String json = sb.toString();

                if (code >= 200 && code < 300) {
                    final String pretty = parseCurrentWeather(json);
                    runOnUiThread(() -> tvResult.setText(pretty));
                } else {
                    // mensaje de error que manda OpenWeather (ej. ciudad no encontrada)
                    String msg = "Error " + code + ".";
                    try {
                        JSONObject err = new JSONObject(json);
                        if (err.has("message")) msg += " " + err.getString("message");
                    } catch (Exception ignore) {}
                    final String finalMsg = msg;
                    runOnUiThread(() -> tvResult.setText(finalMsg));
                }

            } catch (Exception e) {
                runOnUiThread(() -> tvResult.setText("Fallo de red: " + e.getMessage()));
            } finally {
                if (conn != null) conn.disconnect();
            }
        }).start();
    }

    private String parseCurrentWeather(String json) throws Exception {
        JSONObject root = new JSONObject(json);

        String name = root.optString("name", "—");
        JSONObject main = root.getJSONObject("main");
        double temp = main.getDouble("temp");
        int humidity = main.getInt("humidity");

        JSONObject wind = root.optJSONObject("wind");
        double windSpeed = (wind != null) ? wind.optDouble("speed", 0.0) : 0.0;

        JSONArray weatherArr = root.getJSONArray("weather");
        JSONObject w0 = weatherArr.getJSONObject(0);
        String description = w0.getString("description");

        return "Ciudad: " + name + "\n"
                + "Temperatura: " + Math.round(temp) + " °C\n"
                + "Descripción: " + capitalize(description) + "\n"
                + "Humedad: " + humidity + " %\n"
                + "Viento: " + windSpeed + " m/s";
    }

    private String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return s.substring(0,1).toUpperCase() + s.substring(1);
    }
}
