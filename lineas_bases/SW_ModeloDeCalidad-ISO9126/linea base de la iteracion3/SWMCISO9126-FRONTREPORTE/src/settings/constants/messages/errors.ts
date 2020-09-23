export const VMErrors: any = {
  // General Errors
  EGEN_001: {
    es: 'Ha ocurrido un error inesperado.'
  },
  EGEN_002: {
    es: 'Algunos campos son incorrectos.'
  },
  EGEN_003: {
    es: 'Usted no cuenta con los permisos requeridos para realizar esta accion.'
  },
  EGEN_004: {
    es: 'Ha ocurrido un error al momento de enviarle un correo electrónico de confirmación.'
  },
  // Authentication Errors
  EAUTHL_001: {
    es: 'La contraseña ingresada es incorrecta.'
  },
  EAUTHL_002: {
    es: 'Aún no has verificado tu correo electrónico.'
  },
  EAUTHL_003: {
    es: 'Tu cuenta fue desactivada, envianos un mensaje para mayor información.'
  },
  EAUTHL_004: {
    es: 'El correo electrónico no se encuentra registrado.'
  },
  EAUTHS_001: {
    es: 'El email o teléfono ya se encuentran registrados.'
  },
  // Local Establishment Errors
  ELOCES_001: {
    es: 'No puede existir dos sedes de su local con el mismo nombre.'
  },
  // Service Errors
  ESERV_001: {
    es: 'Algunas subcategorias no fueron encontradas en el Sistema.'
  },
  // Front Errors Service
  EFRON_SERV_001: {
    es: 'El servicio debe tener al menos una imagen.'
  },
  EFRON_SERV_002: {
    es: 'El servicio debe pertenecer al menos a una subcategoria.'
  },
  EFRON_SERV_003: {
    es: 'El servicio debe tener al menos un precio'
  },
  EFRON_SERV_004: {
    es: 'El servicio debe ser realizado al menos por 1 personal.'
  },
  // Front Errors Service
  EFRON_PROD_001: {
    es: 'El producto debe tener al menos una imagen.'
  },
  EFRON_PROD_002: {
    es: 'El producto debe pertenecer al menos a una subcategoria.'
  },
  EFRON_PROD_003: {
    es: 'El producto debe tener al menos un precio'
  },
  // User Establishment Errors
  EUSERES_001: {
    es: 'El email o teléfono ya se encuentran registrados.'
  },
  EUSERES_002: {
    es: 'Algunas profesiones no fueron encontradas en el sistema.'
  },
  EUSERES_003: {
    es: 'El personal no esta registrado en el sistema.'
  },
  // From errors user Establishment
  EFRON_UEST_001: {
    es: 'El personal debe tener al menos una profesión.'
  },
  // Front Errors Role
  EFRON_ROLE_001: {
    es: 'El rol debe tener al menos 1 modulo.'
  },
  // User Establishment Schedule Errors
  EUESTSCH_001: {
    es: 'El horario ya se encuentra ocupado.'
  },
  EUESTSCH_002: {
    es: 'El horario no se encuentra.'
  },
  // From errors User Establishment Schedule
  EFRON_UESTSCH_001: {
    es: 'El horario se debe repetir al menos 1 dia de la semana'
  },
  // From errors User App
  EUAPP_001: {
    es: 'El Cliente no se encuentra'
  },
  // From errors Promotion
  EPROM_001: {
    es: 'La promoción no existe'
  },
  EPROM_002: {
    es: 'El código de la promoción ya existe'
  },
  EPROM_003: {
    es: 'La promoción no se encuentra disponible.'
  },
  EPROM_004: {
    es: 'Esta promoción no esta permitida para el uso por el usuario o por el Local.'
  },
  // From errors Currency
  ECURR_001: {
    es: 'Existe mas de una moneda base para el establecimiento'
  },
  ECURR_002: {
    es: 'No existe una moneda base para el establecimiento'
  },
  ECURR_003: {
    es: 'No existe esa moneda en el establecimiento, antes de actualizar tu moneda base agregelo en tus monedas permitidas'
  },
  // From errors Appointment
  EFRON_APPO_001: {
    es: 'La cita debe tener al menos un servicio que se realizara'
  },
  EFRON_APPO_002: {
    es: 'La cita debe pertenecer a un cliente, seleccionelo por favor'
  },
  EFRON_APPO_003: {
    es: 'La cita no esta habilitada para ser eliminada, está pertenece a un Comprobante'
  },
  EAPPOI_001: {
    es: 'La cita no fue encontrada'
  },
  // Fron errors User_Local
  // User Local Errors
  EFRON_USLO_001: {
    es: 'El usuario debe pertenecer al menos a una sede y tener un rol'
  },
  // Local_ROle Errors
  ELROLE_001: {
    es: 'Módulo no encontrado'
  },
  ELROLE_002: {
    es: 'El Rol del Local no fue encontrado'
  },
  ELROLE_003: {
    es: 'Este Rol no esta permitido para ser eliminado'
  },
  // USer_Local Errors
  EUSRLO_001: {
    es: 'El email o teléfono ya se encuentran registrados'
  },
  EUSRLO_002: {
    es: 'El usuario no fue encontrado'
  },
  EUSRLO_003: {
    es: 'Este Usuario no esta permitido para ser eliminado'
  },
// Fron errors User_Local
  // User Local Errors
  EFRON_VOUCH_001: {
    es: 'El comprobante fue eliminado con exito'
  },
  // Local Errors
  ELOCAL_001: {
    es: 'Local no encontrado'
  },
  ELOCAL_002: {
    es: 'No se puede crear un Free Trial porque usted ya obtuvo uno'
  },
  ELOCAL_003: {
    es: 'No puede existir fecha indeterminada a ecepción del plan FREE'
  }
};
