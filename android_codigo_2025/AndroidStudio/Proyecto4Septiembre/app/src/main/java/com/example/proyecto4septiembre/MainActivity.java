package com.example.proyecto4septiembre;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ListView listView;
        String frutas[]={"Manzana","Platano","Piña","Sandia","Melon","Prueba","Elemento Nuevo"};
        listView=findViewById(R.id.listview);
        ArrayAdapter<String> adaptador= new ArrayAdapter<>(this, android.R.layout.simple_list_item_1,frutas);
        listView.setAdapter(adaptador);
    }
}