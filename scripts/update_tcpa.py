import json

UPDATES = {
  'en': {
    'tcpaPre': 'By clicking "Submit", I agree and consent to be contacted by Accident Help Now, Case Settlement Now, Exclusive Leads Agency, their affiliated companies, marketing partners, referral partners, intake partners, service providers, vendors, and the participating law firm or law firms listed here and marketing partners regarding my accident inquiry at the phone number and email I provided, including by phone call, text message, and email. I understand these communications may be made using automated technology, prerecorded voice, artificial voice, or an automatic telephone dialing system, even if my number is on a federal, state, or internal do not call list, to the extent permitted by law. To read the full disclaimer and consent, scroll down or',
    'tcpaClickHere': 'click here',
    'tcpaAnd': '',
    'tcpaPost': '',
  },
  'es': {
    'tcpaPre': 'Al hacer clic en "Enviar", acepto y consiento ser contactado por Accident Help Now, Case Settlement Now, Exclusive Leads Agency, sus empresas afiliadas, socios de marketing, socios de referencia, socios de ingesta, proveedores de servicios, vendedores y el bufete de abogados o bufetes participantes enumerados aquí y socios de marketing con respecto a mi consulta de accidente en el número de teléfono y correo electrónico que proporcioné, incluyendo por llamada telefónica, mensaje de texto y correo electrónico. Entiendo que estas comunicaciones pueden realizarse utilizando tecnología automatizada, voz pregrabada, voz artificial o un sistema de marcación automática, incluso si mi número está en una lista federal, estatal o interna de no llamar, en la medida permitida por la ley. Para leer el aviso legal completo y el consentimiento, desplácese hacia abajo o',
    'tcpaClickHere': 'haga clic aquí',
    'tcpaAnd': '',
    'tcpaPost': '',
  },
  'ca': {
    'tcpaPre': 'By clicking "Submit", I agree and consent to be contacted by Accident Help Now, Case Settlement Now, Exclusive Leads Agency, their affiliated companies, marketing partners, referral partners, intake partners, service providers, vendors, and the participating law firm or law firms listed here and marketing partners regarding my accident inquiry at the phone number and email I provided, including by phone call, text message, and email. I understand these communications may be made using automated technology, prerecorded voice, artificial voice, or an automatic telephone dialing system, even if my number is on a federal, state, or internal do not call list, to the extent permitted by law. To read the full disclaimer and consent, scroll down or',
    'tcpaClickHere': 'click here',
    'tcpaAnd': '',
    'tcpaPost': '',
  },
}

for locale, vals in UPDATES.items():
  path = f'd:/lander/messages/{locale}.json'
  with open(path, encoding='utf-8') as f:
    data = json.load(f)
  data['quiz']['s6'].update(vals)
  with open(path, 'wb') as f:
    f.write(json.dumps(data, ensure_ascii=False, indent=2).encode('utf-8'))
  print(f'{locale}: done')
