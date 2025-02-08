-- Kişiler tablosu
CREATE TABLE Kisiler (
    KisiID INT PRIMARY KEY,
    Ad VARCHAR(50) NOT NULL,
    Soyad VARCHAR(50) NOT NULL,
    Telefon VARCHAR(15) NOT NULL,
    Email VARCHAR(100),
    KayitTarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    AktifMi BIT DEFAULT 1
);

-- İlanlar ana tablosu
CREATE TABLE Ilanlar (
    IlanID INT PRIMARY KEY,
    KisiID INT NOT NULL,
    EmlakTuru ENUM('Konut', 'Arsa', 'Isyeri') NOT NULL,
    IslemTuru ENUM('Satilik', 'Kiralik') NOT NULL,
    Baslik VARCHAR(100) NOT NULL,
    Aciklama TEXT,
    Fiyat DECIMAL(15,2) NOT NULL,
    IlanDurumu ENUM('Aktif', 'Pasif', 'Satildi', 'Kiralandi') DEFAULT 'Aktif',
    Konum GEOMETRY,
    OlusturmaTarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    GuncellemeTarihi DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (KisiID) REFERENCES Kisiler(KisiID)
);

-- Konut ilan detayları
CREATE TABLE KonutIlanDetay (
    IlanID INT PRIMARY KEY,
    Mahalle VARCHAR(100) NOT NULL,
    Sokak VARCHAR(100),
    SiteAdi VARCHAR(100),
    BinaNo VARCHAR(10),
    DaireNo VARCHAR(10),
    OdaSayisi INT NOT NULL,
    SalonSayisi INT NOT NULL,
    Kat INT NOT NULL,
    BinadakiKatSayisi INT,
    BrutAlan DECIMAL(10,2),
    NetAlan DECIMAL(10,2),
    IsitmaTuru VARCHAR(50),
    BanyoSayisi INT,
    FOREIGN KEY (IlanID) REFERENCES Ilanlar(IlanID)
);

-- Arsa ilan detayları
CREATE TABLE ArsaIlanDetay (
    IlanID INT PRIMARY KEY,
    Ada VARCHAR(20) NOT NULL,
    Parsel VARCHAR(20) NOT NULL,
    TapuDurumu ENUM('Hisseli', 'Mustakil') NOT NULL,
    Pay INT,
    Payda INT,
    ToplamAlan DECIMAL(10,2) NOT NULL,
    Imar VARCHAR(100),
    FOREIGN KEY (IlanID) REFERENCES Ilanlar(IlanID)
);

-- Arayanlar tablosu
CREATE TABLE Arayanlar (
    ArayanID INT PRIMARY KEY,
    KisiID INT NOT NULL,
    EmlakTuru ENUM('Konut', 'Arsa', 'Isyeri') NOT NULL,
    IslemTuru ENUM('Satilik', 'Kiralik') NOT NULL,
    ArananKonum GEOMETRY,
    MinFiyat DECIMAL(15,2),
    MaxFiyat DECIMAL(15,2),
    Aciklama TEXT,
    AktifMi BIT DEFAULT 1,
    OlusturmaTarihi DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (KisiID) REFERENCES Kisiler(KisiID)
)