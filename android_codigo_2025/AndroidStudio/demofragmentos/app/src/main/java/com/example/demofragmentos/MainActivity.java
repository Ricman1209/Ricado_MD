package com.example.demofragmentos;

import android.app.Fragment;
import android.os.Bundle;
import android.os.Handler;
import android.view.FrameMetrics;
import android.view.View;
import android.widget.Button;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

public class MainActivity extends AppCompatActivity {

    Button btn;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        btn=findViewById(R.id.button);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FragmentManager fm=getSupportFragmentManager();
                FragmentTransaction ft=fm.beginTransaction();
                FragmentoDos fdos=new FragmentoDos();
                ft.replace(R.id.fragmentContainerView,fdos);
                ft.commit();

                Handler handler=new Handler();
                handler.postDelayed(new Runnable () {
                    @Override
                    public void run() {
                        FragmentManager fm2=getSupportFragmentManager();
                        FragmentTransaction ft2=fm2.beginTransaction();
                        FragmentoUno funo=new FragmentoUno();
                        ft2.replace(R.id.fragmentContainerView,funo);
                        ft2.commit();
                    }
                },5000);
            }
        });

    }
}