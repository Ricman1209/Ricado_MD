package com.example.listview_personalizado;

import android.os.Bundle;
import android.widget.ListView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {
    ListView lista;
    String[][] data={
            {"Breaking dead","James Cameron","5 temporadas","1"},
            {"Vampire Diaries","James Cameron","9 temporadas","2"},
            {"Breaking dead","James Cameron","5 temporadas","3"},
            {"Breaking dead","James Cameron","5 temporadas","4"},
            {"Breaking dead","James Cameron","5 temporadas","4"},
            {"Breaking dead","James Cameron","5 temporadas","4"},
            {"Breaking dead","James Cameron","5 temporadas","4"},
            {"Breaking dead","James Cameron","5 temporadas","4"},
    };

    int[] images={R.drawable.imagen,R.drawable.imagen,R.drawable.imagen,R.drawable.imagen,R.drawable.imagen,R.drawable.imagen,R.drawable.imagen,R.drawable.imagen};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        lista=(ListView) findViewById(R.id.lista);
        lista.setAdapter(new Adaptador(this,data,images));
    }
}