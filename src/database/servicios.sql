CREATE DATABASE `servicios` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(120) NOT NULL,
  `direccion` varchar(120) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `nacionalidad` varchar(120) NOT NULL,
  `correo` varchar(120) NOT NULL,
  `estado` int(11) NOT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `estados_aprobaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

INSERT INTO `estados_aprobaciones` (`id`, `nombre`, `estado`, `fecha_modificacion`) VALUES
(1, 'Solicitada', 1, '2023-03-02 19:24:20'),
(2, 'Aprobada', 1, '2023-03-02 19:24:20'),
(3, 'Anulada', 1, '2023-03-02 19:24:20');


CREATE TABLE `ordenes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clienteId` int(11) NOT NULL,
  `fecha_orden` date NOT NULL,
  `estadosAprobacioneId` int(11) NOT NULL,
  `estado` int(11) NOT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orden_cliente` (`clienteId`),
  CONSTRAINT `fk_orden_cliente` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `consecutivo` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `ordeneId` int(11) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
   `alto` varchar(45) NOT NULL,
  `ancho` varchar(45) NOT NULL,
  `estado` int(11) NOT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orden_productos` (`ordeneId`),
  CONSTRAINT `fk_orden_productos` FOREIGN KEY (`ordeneId`) REFERENCES `ordenes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;