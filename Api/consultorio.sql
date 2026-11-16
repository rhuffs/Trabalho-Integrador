CREATE TYPE sexo_enum AS ENUM (
    'Masculino',
    'Feminino',
    'Outro'
);

CREATE TYPE estado_civil_enum AS ENUM (
    'Solteiro',
    'Casado',
    'Divorciado',
    'Viúvo',
    'União Estável'
);


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
 	sexo			 sexo_enum NOT NULL,
 	estado_civil     estado_civil_enum,
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
    profissional_login       VARCHAR(255) NOT NULL PRIMARY KEY,
    nome        VARCHAR(100) NOT NULL,
    senha       VARCHAR(255) NOT NULL,  -- hash bcrypt da senha
	telefone    VARCHAR(10) NOT NULL,
	tipo_profissional enum_profissional_tipo NOT NULL
);


CREATE TABLE permissao (
    id          BIGSERIAL PRIMARY KEY,
    descricao   VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE profissional_permissao (
    profissional_login           VARCHAR(255) NOT NULL REFERENCES profissional(profissional_login) ON DELETE CASCADE,
    permissao_id    BIGINT NOT NULL REFERENCES permissao(id) ON DELETE CASCADE,
    PRIMARY KEY (profissional_login, id_permissao)
);

CREATE INDEX idx_profissional_permissao_profissional_login ON profissional_permissao (profissional_login);
CREATE INDEX idx_profissional_permissao_permissao_id ON profissional_permissao (permissao_id);

INSERT INTO permissao (descricao) VALUES
    ('SECRETARIO'),
    ('DENTISTA'),
    ('ADMIN');

/* Exemplo add permissão pra alguém:
INSERT INTO profissional_permissao (profissional_login, id_permissao)
SELECT 'user@email.com', id FROM permissao;
*/

CREATE TABLE procedimentos(
    procedimento_id      SERIAL PRIMARY KEY,
    procedimento_nome    VARCHAR(100) NOT NULL,
    procedimento_desc    TEXT,
    preco                NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
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

INSERT INTO procedimentos (procedimento_nome, procedimento_desc, preco)
VALUES
    ('Prótese Total', 'Dentadura', 2000.00),
    ('Prótese Parcial', 'Aparelho que substitui um ou mais dentes ausentes', 2200.00),
    ('Coroa de Porcelana', '(Unitária)Capa protetora feita sob medida para cobrir todo o dente danificado, enfraquecido, com grande perda de estrutura ou após um tratamento de canal', 2000.00),
    ('Prótese Provisória', 'Solução temporária feita de resina acrílica ou bisacrílica utilizada para restaurar a estética, a fala e a mastigação enquanto a peça definitiva é produzida', 250.00),
    ('Implante Convencional', 'É o método tradicional em que um pino de titânio (que funciona como a raiz do dente) é inserido no osso maxilar ou mandibular por meio de uma cirurgia', 1700.00),
    ('Cicatrizador','É um componente protético temporário usado em implantes dentários',200),
    ('Enxerto Gengival','(Unitária)é um procedimento cirúrgico periodontal realizado para adicionar volume, cobrir raízes expostas ou aumentar a faixa de tecido ao redor dos dentes e implantes',3000.00),
    ('Faceta','(Unitária)lâminas finas aplicadas sobre a parte frontal dos dentes para corrigir cor, formato, tamanho ou pequenos desalinhamentos',2000.00),
    ('Profilaxia de Protocolo','A profilaxia de uma prótese protocolo (prótese total fixa sobre implantes) é um procedimento especializado realizado no consultório odontológico para remover o biofilme e evitar infecções peri-implantares',300.00),
    ('Prótese Protocolo','É uma reabilitação fixa de uma arcada dentária inteira, composta por 12 a 14 dentes presos em uma única estrutura que é parafusada sobre 4 a 6 implantes dentários',10000.00),
    ('Prótese Protocolo Provisória','É uma arcada dentária fixa instalada logo após a cirurgia de colocação de implantes',3000.00),
    ('Exodontia Simples','Procedimento odontológico para a remoção de um dente que está totalmente erupcionado na cavidade bucal',250.00),
    ('Restauração de Resina','(Cada face do dente)tratamento odontológico usado para recuperar dentes com cáries, fraturas ou desgastes',150.00),
    ('Clareamento','É um procedimento estético que utiliza agentes químicos para quebrar as moléculas de pigmento que escurecem o esmalte e a dentina',650.00),
    ('Profilaxia Dentária','Limpeza profissional dos dentes',180.00),
    ('Manutenção Ortodôntica','É o acompanhamento periódico para ativar, ajustar ou higienizar o aparelho',110.00),
    ('Exodontia de Siso Incluso','Extração de siso incluso',650),
    ('Radiografia Digital','É uma tecnologia de diagnóstico por imagem que substitui os filmes radiográficos tradicionais por sensores eletrônicos ou placas de fósforo',35);

CREATE TABLE anamnese_item (
	anamnese_id SERIAL PRIMARY KEY,
	anamnese_nome VARCHAR(255) NOT NULL
);

CREATE TABLE consulta_anamnese (
	anamnese_id INT NOT NULL,
	consulta_id INT NOT NULL
);

CREATE TABLE consulta (
	consulta_id SERIAL PRIMARY KEY,
	consulta_desc TEXT,
	consulta_valor NUMERIC(10,2) NOT NULL,
	financeiro_id INT NOT NULL,
	consulta_alt_odonto TEXT,
	consulta_att_paciente TEXT,
	procedimento_id INT NOT NULL,
	paciente_id INT NOT NULL
);
ALTER TABLE consulta ADD CONSTRAINT fk_consulta_procedimento_id FOREIGN KEY (procedimento_id) REFERENCES procedimentos (procedimento_id);
ALTER TABLE consulta ADD CONSTRAINT fk_consulta_paciente FOREIGN KEY (id_paciente) REFERENCES pacientes (id);

ALTER TABLE consulta_anamnese ADD CONSTRAINT pk_consulta_anamnese PRIMARY KEY (anamnese_id,consulta_id);
ALTER TABLE consulta_anamnese ADD CONSTRAINT fk_consulta_anamnese_anamnese_id FOREIGN KEY (anamnese_id) REFERENCES anamnese_item (anamnese_id);
ALTER TABLE consulta_anamnese ADD CONSTRAINT fk_consulta_anamnese_consulta_id FOREIGN KEY (consulta_id) REFERENCES consulta (consulta_id);

INSERT INTO anamnese_item (anamnese_nome) VALUES 
	('Gengivas Sangram Facilmente'),
	('Retenção de Alimento Entre os Dentes'),
	('Alergia à Aspirina'),
	('Alergia à Penicilina'),
	('Alergia à Sulfas'),
	('Alergia à Iodo'),
	('Alergia à Anestésicos'),
	('Alergia à Sedativos e Barbitúricos'),
	('Morde Lápis ou Caneta'),
	('Rói Unhas'),
	('Gravida mês 1'),
	('Gravida mês 2'),
	('Gravida mês 3'),
	('Gravida mês 4'),
	('Gravida mês 5'),
	('Gravida mês 6'),
	('Gravida mês 7'),
	('Gravida mês 8'),
	('Gravida mês 9'),
	('Gravida mês 10'),
	('Diabetes'),
	('Tuberculose'),
	('Artrite'),
	('Problemas cardíacos'),
	('Asma'),
	('Hipertensão sanguínea'),
	('Problemas renais'),
	('Problemas hepáticos'),
	('Dentes sensíveis ao frio'),
	('Dentes sensíveis aos doces'),
	('Higiene Regular'),
	('Higiene Deficiente'),
	('Halitose Moderada'),
	('Halitose Forte'),
	('Pouco Tártaro'),
	('Muito Tártaro'),
	('Gengivite'),
	('Periodontite'),
	('Mucosa Alterada');