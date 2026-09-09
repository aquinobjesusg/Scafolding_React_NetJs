<?php

namespace App\Support;

use Illuminate\Support\Collection;

class SpanishQuotes
{
    public static function getRandomQuote(): string
    {
        $quotes = [
            'Actúa solo según aquella máxima mediante la cual puedas querer, al mismo tiempo, que se convierta en una ley universal. - Immanuel Kant',
            'Una vida sin examen no vale la pena ser vivida. - Sócrates',
            'Sé presente por encima de todo. - Naval Ravikant',
            'Haz lo que puedas, con lo que tienes, donde estés. - Theodore Roosevelt',
            'La felicidad no es algo prefabricado. Viene de tus propias acciones. - Dalai Lama',
            'Quien está contento es rico. - Laozi',
            'Empiezo a hablar solo cuando estoy seguro de que lo que voy a decir no es mejor dejarlo sin decir. - Cato el Joven',
            'No he fracasado. Solo he encontrado 10,000 maneras que no funcionan. - Thomas Edison',
            'Si no tienes un objetivo coherente en la vida, no puedes vivirla de una manera coherente. - Marco Aurelio',
            'Nunca es demasiado tarde para ser lo que podrías haber sido. - George Eliot',
            'No es pobre el hombre que tiene poco, sino el que desea más. - Séneca',
            'Es la calidad, no la cantidad, lo que importa. - Lucio Anneo Séneca',
            'Saber no es suficiente; debemos aplicar. Estar dispuesto no es suficiente; debemos hacer. - Leonardo da Vinci',
            'Que todas tus cosas tengan su lugar; que cada parte de tu negocio tenga su tiempo. - Benjamin Franklin',
            'Vive como si fueras a morir mañana. Aprende como si fueras a vivir para siempre. - Mahatma Gandhi',
            'Sin palabras sobrantes ni acciones innecesarias. - Marco Aurelio',
            'Nada que valga la pena se consigue fácilmente. - Theodore Roosevelt',
            'Ordena tu alma. Reduce tus deseos. - Agustín',
            'Las personas encuentran placer de diferentes maneras. Yo lo encuentro manteniendo mi mente clara. - Marco Aurelio',
            'La simplicidad es un gusto adquirido. - Katharine Gerould',
            'La simplicidad es la consecuencia de emociones refinadas. - Jean D\'Alembert',
            'La simplicidad es la esencia de la felicidad. - Cedric Bledsoe',
            'La simplicidad es la máxima sofisticación. - Leonardo da Vinci',
            'Sonríe, respira y ve despacio. - Thich Nhat Hanh',
            'La única manera de hacer un gran trabajo es amar lo que haces. - Steve Jobs',
            'Todo el futuro está en incertidumbre: vive de inmediato. - Séneca',
            'Muy poco se necesita para hacer una vida feliz. - Marco Aurelio',
            'No pierdas más tiempo discutiendo qué debe ser un buen hombre; sé uno. - Marco Aurelio',
            'Bien comenzado es medio hecho. - Aristóteles',
            'Cuando no hay deseo, todas las cosas están en paz. - Laozi',
            'Camina como si estuvieras besando la Tierra con tus pies. - Thich Nhat Hanh',
            'Porque estás vivo, todo es posible. - Thich Nhat Hanh',
            'Al inhalar, calmo cuerpo y mente. Al exhalar, sonrío. - Thich Nhat Hanh',
            'La vida solo está disponible en el momento presente. - Thich Nhat Hanh',
            'La mejor manera de cuidar el futuro es cuidar el momento presente. - Thich Nhat Hanh',
            'Nada en la vida debe ser temido, solo comprendido. Ahora es el momento de comprender más, para temer menos. - Marie Curie',
            'La batalla más grande es la guerra contra la ignorancia. - Mustafa Kemal Atatürk',
            'Recuerda siempre que eres absolutamente único. Igual que todos los demás. - Margaret Mead',
            'Debes ser el cambio que deseas ver en el mundo. - Mahatma Gandhi',
            'Debemos entregar (ship). - Taylor Otwell',
        ];

        return $quotes[array_rand($quotes)];
    }
}