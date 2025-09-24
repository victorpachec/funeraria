CREATE DATABASE IF NOT EXISTS funeraria;
USE funeraria;

CREATE TABLE `servicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `descricao` text DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `servicos` (`id`, `nome`, `preco`, `descricao`, `img`, `data_criacao`) VALUES
(1, 'Urna Clássica', 1200.00, 'Urna tradicional em madeira de lei.', 'img/urna1.jpg', NOW()),
(2, 'Coroa de Flores Premium', 450.00, 'Arranjo floral com rosas e lírios.', 'img/flores1.jpg', NOW()),
(3, 'Plano Familiar Básico', 200.00, 'Cobertura funerária simples para toda a família.', 'img/plano1.jpg', NOW()),
(4, 'Velório Completo', 3000.00, 'Serviço completo de velório em capela.', 'img/velorio1.jpg', NOW());

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `senha` varchar(255) NOT NULL,
  `rua` varchar(100) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(50) DEFAULT NULL,
  `cep` varchar(20) DEFAULT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
