package com.run;

import org.openxava.util.*;

/**
 * Ejecuta esta clase para arrancar la aplicación.
 */

public class oxcontabilidad {

	public static void main(String[] args) throws Exception {
		DBServer.start("oxcontabilidad-db"); // Para usar tu propia base de datos comenta esta línea y configura src/main/webapp/META-INF/context.xml
		AppServer.run("oxcontabilidad"); // Usa AppServer.run("") para funcionar en el contexto raíz
	}

}
