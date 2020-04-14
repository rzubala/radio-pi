import i18n from "i18n-js";

const en = {
  NetworkError: "Network error!",
  Error: "Error",
  NoConnection: "No connection to radio: ",
  CheckWifi: "Please check your WiFi connection.",
  TryAgain: "Try again",
  ChangeAddress: "Change address",
  Settings: "Settings",
  Radio: "Radio",
  Streams: "Streams",
  RadioURL: 'Radio service url:',
  Volume: 'Volume:',
  Restart: 'Restart',
  Shutdown: 'Shutdown',
  Name: 'Name',
  StreamURL: 'Stream URL',
  LogoURL: 'Logo URL',
  EditTrack: 'Edit stream',
  AddTrack: 'Add stream'
};

const pl = {
  NetworkError: "Błąd sieci!",
  Error: "Błąd",
  NoConnection: "Brak połączenia z radiem: ",
  CheckWifi: "Sprawdź czy urządzenie jest połączone przez Wifi.",
  TryAgain: "Spróbuj ponownie",
  ChangeAddress: "Zmień adres",
  Settings: "Ustawienia",
  Radio: "Radio",
  Streams: "Strumienie",
  RadioURL: 'URL serwera radia:',
  Volume: 'Głośność:',
  Restart: 'Restart',
  Shutdown: 'Wyłączenie',
  StreamURL: 'URL strumienia',
  LogoURL: 'URL Loga',
  Name: 'Nazwa',
  EditTrack: 'Edytuj strumień',
  AddTrack: 'Dodaj strumień'
};

i18n.translations["en"] = en;
i18n.translations["pl"] = pl;

export default i18n;
