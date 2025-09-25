package com.example.listview_personalizado;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

public class Adaptador extends BaseAdapter {

    private static LayoutInflater inflater=null;
    Context context;
    String[][] datos;
    int[] imgs;

    public Adaptador(Context context, String[][] datos, int[] imgs) {
        this.context = context;
        this.datos = datos;
        this.imgs = imgs;
        inflater=(LayoutInflater) context.getSystemService(context.LAYOUT_INFLATER_SERVICE);
    }

    @Override
    public int getCount() {
        return imgs.length;
    }

    @Override
    public Object getItem(int i) {
        return null;
    }

    @Override
    public long getItemId(int i) {
        return 0;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        final View vista=inflater.inflate(R.layout.lista_item,null);
        TextView titulo=(TextView) vista.findViewById(R.id.tvTitulo);
        TextView temporadas=(TextView) vista.findViewById(R.id.tvTemporadas);
        TextView director=(TextView) vista.findViewById(R.id.tvDirector);
        ImageView imagen=(ImageView) vista.findViewById(R.id.imagen);
        RatingBar calif=(RatingBar) vista.findViewById(R.id.rating);

        titulo.setText(datos[i][0]);
        director.setText(datos[i][1]);
        temporadas.setText(datos[i][2]);
        calif.setNumStars(Integer.parseInt(datos[i][3]));
        imagen.setImageResource(imgs[i]);

        return vista;
    }
}