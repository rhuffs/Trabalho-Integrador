CREATE TABLE pacientes (
    id               SERIAL PRIMARY KEY,
    nome             VARCHAR(100) NOT NULL,
    data_nascimento  DATE NOT NULL,
 	endereco 		 VARCHAR(150) NOT NULL,
 	profissao 		 VARCHAR(50) ,
    quem_indicou     VARCHAR(50),
    cidade 			 VARCHAR (50) NOT NULL,
 	uf				 VARCHAR(2) NOT NULL,
 	cep 			 VARCHAR(8) NOT NULL,
 	telefone         VARCHAR(10) NOT NULL,
 	local_nascimento VARCHAR(20),
 	sexo			 VARCHAR(15) NOT NULL,
 	estado_civil     VARCHAR(20),
 	email            VARCHAR(50) NOT NULL UNIQUE,
 	mae_pai          VARCHAR(100),
 	cpf 			 VARCHAR(14),
 	rg 				 VARCHAR(20) NOT NULL UNIQUE,
 	autorizacao      BOOLEAN NOT NULL DEFAULT TRUE,
 	debito 			 FLOAT, 
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TYPE enum_profissional_tipo AS ENUM ('DENTISTA', 'SECRETARIO');

CREATE TABLE profissional (
    profissional_login       VARCHAR(255) PRIMARY KEY,
    nome        VARCHAR(100) NOT NULL,
    senha       VARCHAR(255) NOT NULL,  -- hash bcrypt da senha
	telefone    VARCHAR(255) NOT NULL,
	tipo_profissional enum_profissional_tipo NOT NULL
);


CREATE TABLE permissao (
    id          BIGSERIAL PRIMARY KEY,
    descricao   VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE profissional_permissao (
    profissional_login           VARCHAR(255) NOT NULL REFERENCES profissional(profissional_login) ON DELETE CASCADE,
    id_permissao    BIGINT NOT NULL REFERENCES permissao(id) ON DELETE CASCADE,
    PRIMARY KEY (profissional_login, id_permissao)
);

CREATE INDEX idx_profissional_permissao_profissional_login ON profissional_permissao (profissional_login);
CREATE INDEX idx_profissional_permissao_id_permissao ON profissional_permissao (id_permissao);

INSERT INTO permissao (descricao) VALUES
    ('SECRETARIO'),
    ('ADMIN');

/* Exemplo add permissão pra alguém:
INSERT INTO profissional_permissao (profissional_login, id_permissao)
SELECT 'user@email.com', id FROM permissao;
*/
CREATE TABLE profissionais(
    id                  SERIAL PRIMARY KEY,
    profissional_login  VARCHAR(100) NOT NULL,
    nome_completo       VARCHAR(100) NOT NULL,
    senha               VARCHAR(255) NOT NULL, /*Armazena hash*/
  	telefone            VARCHAR(10) NOT NULL,
    tipo_profissional enum_profissional_tipo NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


INSERT INTO pacientes (
    nome,
    data_nascimento,
    endereco,
    profissao,
    quem_indicou,
    cidade,
    uf,
    cep,
    telefone,
    local_nascimento,
    sexo,
    estado_civil,
    email,
    mae_pai,
    cpf,
    rg,
    autorizacao,
    debito
) VALUES (
    'João da Silva',
    '1995-06-15',
    'Rua das Flores, 123',
    'Professor',
    'Indicação de teste',
    'Chapecó',
    'SC',
    '89801000',
    '4999999999',
    'Chapecó',
    'Masculino',
    'Solteiro',
    'joao.teste@example.com',
    'Maria da Silva',
    '000.000.000-00',
    'TESTE-RG-001',
    TRUE,
    150.50
);
