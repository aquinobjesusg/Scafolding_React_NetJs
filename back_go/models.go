package main

// Diccionario
type Diccionario struct {
	ID                int     `json:"id"`
	Grupo             *string `json:"grupo"`
	Texto             *string `json:"texto"`
	LenguajesID       *int    `json:"lenguajes_id"`
	NivelID           *int    `json:"nivel_id"`
	TipodiccionarioID *int    `json:"tipodiccionario_id"`
	TipopalabraID     *int    `json:"tipopalabra_id"`
}

// Images
type Image struct {
	ID      int     `json:"id"`
	Gallery *string `json:"gallery"`
	Image   *string `json:"image"`
}

// Lenguajes
type Lenguaje struct {
	ID       int     `json:"id"`
	Lenguaje *string `json:"lenguaje"`
	Siglas   *string `json:"siglas"`
}

// Nivel
type Nivel struct {
	ID    int     `json:"id"`
	Nivel *string `json:"nivel"`
}

// OxDiscussionComments
type OxDiscussionComment struct {
	ID           int     `json:"id"`
	Comment      *string `json:"comment"`
	DiscussionID *int    `json:"discussionid"`
	Time         *int64  `json:"time"`
	Username     *string `json:"username"`
}

// Roles
type Role struct {
	ID     int     `json:"id"`
	Roles  *string `json:"roles"`
	Siglas *string `json:"siglas"`
}

// TipoDeDiccionario
type TipoDeDiccionario struct {
	ID              int     `json:"id"`
	Tipodiccionario *string `json:"tipodiccionario"`
}

// TipoDePalabra
type TipoDePalabra struct {
	ID      int     `json:"id"`
	Palabra *string `json:"palabra"`
}

// Users
type User struct {
	ID                int     `json:"id"`
	Apellido          *string `json:"apellido"`
	Avatar            *string `json:"avatar"`
	Edad              *int    `json:"edad"`
	Email             *string `json:"email"`
	EmailVerified     *bool   `json:"emailverified"`
	FechaDeNacimiento *string `json:"fechadenacimiento"`
	InCambioClave     *bool   `json:"incambioclave"`
	Nombre            *string `json:"nombre"`
	Password          *string `json:"password"`
	RememberToken     *string `json:"remembertoken"`
	UserRoleID        *int    `json:"userrole_id"`
	Usuario           *string `json:"usuario"`
	LenguajesNativoID *int    `json:"lenguajesnativo_id"`
}

// UsersRoles
type UserRole struct {
	ID     int `json:"id"`
	RoleID *int `json:"role_id"`
	UserID *int `json:"user_id"`
}