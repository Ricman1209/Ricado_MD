package com.example.weatherapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.animation.AnimationUtils;
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

    // NUEVOS views del layout “bonito”
    private TextView tvTemp, tvDesc, tvEmoji;
    private View cardResult;

    private Button btnFetch, btnDetail, btnMap, btnShare, btnAbout;

    // Últimos datos obtenidos (para compartir/abrir mapa y pasar a detalle)
    private String lastCity = null;
    private String lastDescription = null;
    private Double lastTemp = null;
    private Integer lastHumidity = null;
    private Double lastWind = null;
    private Double lastLat = null;
    private Double lastLon = null;

    public static final String EXTRA_CITY = "extra_city";
    public static final String EXTRA_DESC = "extra_desc";
    public static final String EXTRA_TEMP = "extra_temp";
    public static final String EXTRA_HUM = "extra_hum";
    public static final String EXTRA_WIND = "extra_wind";
    public static final String EXTRA_LAT = "extra_lat";
    public static final String EXTRA_LON = "extra_lon";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        etCity = findViewById(R.id.etCity);

        // Vincular nuevos views
        tvTemp = findViewById(R.id.tvTemp);
        tvDesc = findViewById(R.id.tvDesc);
        tvEmoji = findViewById(R.id.tvEmoji);
        cardResult = findViewById(R.id.cardResult);

        btnFetch = findViewById(R.id.btnFetch);
        btnDetail = findViewById(R.id.btnDetail);
        btnMap = findViewById(R.id.btnMap);
        btnShare = findViewById(R.id.btnShare);
        btnAbout = findViewById(R.id.btnAbout);

        btnFetch.setOnClickListener(v -> onFetchClick());
        btnDetail.setOnClickListener(v -> openDetailExplicit());
        btnMap.setOnClickListener(v -> openMapImplicit());
        btnShare.setOnClickListener(v -> shareImplicit());
        btnAbout.setOnClickListener(v -> openAboutExplicit());
    }

    private void onFetchClick() {
        // VALIDACIÓN de entrada (no vacío, solo letras/espacios básicos)
        String city = etCity.getText().toString().trim();
        if (city.isEmpty()) {
            etCity.setError("Escribe una ciudad");
            etCity.requestFocus();
            return;
        }
        if (!city.matches("[A-Za-zÁÉÍÓÚáéíóúÑñüÜ .'-]{2,}")) {
            etCity.setError("Solo letras y espacios (mín. 2 caracteres)");
            etCity.requestFocus();
            return;
        }

        // VALIDACIÓN de conectividad
        if (!hasInternet()) {
            tvDesc.setText("Sin conexión a Internet.");
            tvTemp.setText("— °C");
            tvEmoji.setText("🌐");
            return;
        }

        // Estado de carga en UI
        tvTemp.setText("— °C");
        tvDesc.setText("Cargando…");
        tvEmoji.setText("⌛");

        fetchWeather(city);
    }

    private boolean hasInternet() {
        ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        if (cm == null) return false;
        NetworkInfo ni = cm.getActiveNetworkInfo();
        return ni != null && ni.isConnected();
    }

    private void fetchWeather(String city) {
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
                    parseAndStore(json);

                    runOnUiThread(() -> {
                        // Mostrar solo temperatura y descripción (como pediste)
                        tvTemp.setText((lastTemp != null) ? (Math.round(lastTemp) + " °C") : "— °C");
                        tvDesc.setText((lastDescription != null && !lastDescription.isEmpty()) ? lastDescription : "—");
                        tvEmoji.setText(emojiFor(lastDescription));

                        // Animaciones suaves
                        cardResult.startAnimation(AnimationUtils.loadAnimation(this, R.anim.scale_in));
                        tvDesc.startAnimation(AnimationUtils.loadAnimation(this, R.anim.fade_in));

                        // Habilitar acciones
                        btnDetail.setEnabled(true);
                        btnMap.setEnabled(true);
                        btnShare.setEnabled(true);
                    });
                } else {
                    String msg = "Error " + code + ".";
                    try {
                        JSONObject err = new JSONObject(json);
                        if (err.has("message")) msg += " " + err.getString("message");
                    } catch (Exception ignore) {}
                    final String finalMsg = msg;
                    runOnUiThread(() -> {
                        tvDesc.setText(finalMsg);
                        tvTemp.setText("— °C");
                        tvEmoji.setText("⚠️");
                    });
                }

            } catch (Exception e) {
                runOnUiThread(() -> {
                    tvDesc.setText("Fallo de red: " + e.getMessage());
                    tvTemp.setText("— °C");
                    tvEmoji.setText("⚠️");
                });
            } finally {
                if (conn != null) conn.disconnect();
            }
        }).start();
    }

    private void parseAndStore(String json) throws Exception {
        JSONObject root = new JSONObject(json);

        lastCity = root.optString("name", "—");

        JSONObject main = root.getJSONObject("main");
        lastTemp = main.getDouble("temp");
        lastHumidity = main.getInt("humidity");

        JSONObject wind = root.optJSONObject("wind");
        lastWind = (wind != null) ? wind.optDouble("speed", 0.0) : 0.0;

        JSONArray weatherArr = root.getJSONArray("weather");
        JSONObject w0 = weatherArr.getJSONObject(0);
        lastDescription = capitalize(w0.getString("description"));

        JSONObject coord = root.optJSONObject("coord");
        if (coord != null) {
            lastLat = coord.optDouble("lat");
            lastLon = coord.optDouble("lon");
        } else {
            lastLat = null;
            lastLon = null;
        }
    }

    private String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return s.substring(0,1).toUpperCase() + s.substring(1);
    }

    private String emojiFor(String desc) {
        if (desc == null) return "⛅";
        String d = desc.toLowerCase();
        if (d.contains("tormenta")) return "⛈️";
        if (d.contains("lluvia") || d.contains("chubascos")) return "🌧️";
        if (d.contains("nieve") || d.contains("nev")) return "❄️";
        if (d.contains("nubes dispersas") || d.contains("nubes")) return "⛅";
        if (d.contains("niebla") || d.contains("neblina") || d.contains("bruma")) return "🌫️";
        if (d.contains("claro") || d.contains("despejado") || d.contains("soleado")) return "☀️";
        return "🌡️";
    }

    // -------- INTENTS --------

    // 1) EXPLÍCITO con EXTRAS: abrir DetailActivity
    private void openDetailExplicit() {
        if (lastCity == null) {
            tvDesc.setText("Primero consulta el clima.");
            return;
        }
        Intent i = new Intent(this, DetailActivity.class);
        i.putExtra(EXTRA_CITY, lastCity);
        if (lastDescription != null) i.putExtra(EXTRA_DESC, lastDescription);
        if (lastTemp != null) i.putExtra(EXTRA_TEMP, lastTemp);
        if (lastHumidity != null) i.putExtra(EXTRA_HUM, lastHumidity);
        if (lastWind != null) i.putExtra(EXTRA_WIND, lastWind);
        if (lastLat != null) i.putExtra(EXTRA_LAT, lastLat);
        if (lastLon != null) i.putExtra(EXTRA_LON, lastLon);
        startActivity(i);
        overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left); // ANIMACIÓN de transición
    }

    // 2) IMPLÍCITO: abrir mapa (geo) con lat/lon o nombre de ciudad
    private void openMapImplicit() {
        if (lastCity == null) {
            tvDesc.setText("Primero consulta el clima.");
            return;
        }

        // 1) Intent implícito geo:
        Uri geoUri;
        if (lastLat != null && lastLon != null) {
            geoUri = Uri.parse("geo:" + lastLat + "," + lastLon + "?q="
                    + lastLat + "," + lastLon + "(" + Uri.encode(lastCity) + ")");
        } else {
            geoUri = Uri.parse("geo:0,0?q=" + Uri.encode(lastCity));
        }
        Intent mapIntent = new Intent(Intent.ACTION_VIEW, geoUri);

        if (mapIntent.resolveActivity(getPackageManager()) != null) {
            startActivity(mapIntent);
            return;
        }

        // 2) Fallback: abrir en navegador (Google Maps web)
        String query = (lastLat != null && lastLon != null)
                ? (lastLat + "," + lastLon)
                : Uri.encode(lastCity);
        Uri webUri = Uri.parse("https://www.google.com/maps/search/?api=1&query=" + query);
        Intent webIntent = new Intent(Intent.ACTION_VIEW, webUri);

        if (webIntent.resolveActivity(getPackageManager()) != null) {
            startActivity(webIntent);
        } else {
            tvDesc.setText("No hay app de mapas ni navegador disponible.");
        }
    }

    // 3) IMPLÍCITO: compartir texto con otras apps
    private void shareImplicit() {
        if (lastCity == null) {
            tvDesc.setText("Primero consulta el clima.");
            return;
        }
        String shareTxt = "Clima en " + lastCity + ": " +
                (lastTemp != null ? (Math.round(lastTemp) + "°C, ") : "") +
                (lastDescription != null ? lastDescription : "sin descripción");
        Intent share = new Intent(Intent.ACTION_SEND);
        share.setType("text/plain");
        share.putExtra(Intent.EXTRA_TEXT, shareTxt);
        Intent chooser = Intent.createChooser(share, "Compartir clima");
        if (share.resolveActivity(getPackageManager()) != null) {
            startActivity(chooser);
        } else {
            tvDesc.setText("No hay apps para compartir.");
        }
    }

    // 4) EXPLÍCITO: abrir pantalla "Acerca de"
    private void openAboutExplicit() {
        Intent i = new Intent(this, AboutActivity.class);
        startActivity(i);
        overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
    }
}
