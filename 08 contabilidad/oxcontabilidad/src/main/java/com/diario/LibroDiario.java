package com.diario;
 
import java.time.*;

import javax.persistence.*;

import org.openxava.annotations.*;

import com.extensiones.*;

import lombok.*;

@Entity @Getter @Setter
@View(name="Simple", // Esta vista solo se usarÃ¡ cuando se especifique âSimpleâ
members="id, descripcion" // Muestra Ãºnicamente numero y nombre en la misma lÃ­nea
)
@Tab(properties="ordenDelaCuenta, numeroDeLaCuenta, nombreDeLaCuenta,  nivel.descripcion, tipo.descripcion") // Tab sin nombre, es el de por defecto
public class LibroDiario extends Incrementable4 {
	
	LocalDate fechaComprobante;
	
    Integer numeroDeComprobante;
	
	String numeroDeLaCuenta;
	
	String descripcionDeLaCuenta;
	
	String descripcionDeLaOperacion;

	Double montoDebe;
	
	Double montoHaber;
	
	Double diferencia;
    
}





