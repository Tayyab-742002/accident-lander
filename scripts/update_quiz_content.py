import json

EN_FOOTER = ("This is an advertising service and not a law firm, attorney referral service, or legal advice provider. "
  "Information submitted through this website is first reviewed by our intake team. If your situation meets certain "
  "criteria, you may be connected with a licensed attorney or legal service provider who can discuss your legal options. "
  "Results vary based on the facts and circumstances of each case. Any compensation or settlement amounts referenced are "
  "for informational purposes only and do not guarantee future outcomes. Attorneys typically work on a contingency fee "
  "basis, meaning no attorney fees are owed unless a recovery is obtained. Submitting this form does not create an "
  "attorney-client relationship.")

# ── load EN as the source of truth for the new copy ──────────────────
with open('messages/en.json', encoding='utf-8') as f:
    en = json.load(f)

# fix the missing space typo in EN footer
en['quiz']['footer']['disclaimer'] = EN_FOOTER
with open('messages/en.json', 'wb') as f:
    f.write(json.dumps(en, ensure_ascii=False, indent=2).encode('utf-8'))
print('en: footer typo fixed')

EN_Q = en['quiz']

# ── CA: same English header + Q1–Q5, KEEP existing DK Law footer ─────
with open('messages/ca.json', encoding='utf-8') as f:
    ca = json.load(f)
for k in ['header', 's1', 's2', 's3', 's4', 's5']:
    ca['quiz'][k] = json.loads(json.dumps(EN_Q[k]))  # deep copy
# footer left untouched (DK Law California disclaimer)
with open('messages/ca.json', 'wb') as f:
    f.write(json.dumps(ca, ensure_ascii=False, indent=2).encode('utf-8'))
print('ca: header + s1-s5 updated, DK Law footer kept')

# ── ES: translated new copy ──────────────────────────────────────────
ES = {
  'header': {
    'eyebrow': es_eyebrow if (es_eyebrow := None) else '🔒 Revisión Gratuita y Confidencial',
    'title': 'Su Reclamo de Accidente Podría Valer Más de lo Que ',
    'titleEm': 'Usted Cree',
    'sub1': 'Las compañías de seguros no siempre ofrecen el valor total de un reclamo. Complete esta ',
    'subStrong': 'revisión rápida de 60 segundos',
    'sub2': ' para ver si puede calificar para discutir su caso y posibles opciones de compensación.',
  },
  's1': {
    'question': '¿Qué tipo de accidente tuvo?',
    'hint': '(Incluso los pasajeros pueden calificar.)',
    'options': [
      {'label': 'Colisión Vehicular', 'sub': 'Automóvil, camión u otro vehículo'},
      {'label': 'Incidente de Motocicleta', 'sub': 'Motocicleta o accidente relacionado con la vía'},
      {'label': 'Situación de Viaje Compartido', 'sub': 'Uber, Lyft o conductor de entregas involucrado'},
      {'label': 'Peatón o Ciclista', 'sub': 'Involucrado mientras caminaba o andaba en bicicleta'},
    ],
  },
  's2': {
    'question': '¿Cuándo ocurrió el accidente?',
    'hint': '(Seleccione el período que corresponda.)',
    'options': [
      {'label': 'En los últimos 30 días', 'sub': ''},
      {'label': 'Hace 1 a 6 meses', 'sub': ''},
      {'label': 'Hace 6 meses a 1 año', 'sub': ''},
      {'label': 'Hace más de 1 año', 'sub': '', 'dq': True},
    ],
  },
  's3': {
    'question': '¿Recibió tratamiento médico después del accidente?',
    'hint': '(Seleccione la opción que mejor aplique.)',
    'options': [
      {'label': 'Sala de Emergencias', 'sub': ''},
      {'label': 'Atención de Urgencia / Especialista', 'sub': ''},
      {'label': 'Solo Tratamiento Menor', 'sub': ''},
      {'label': 'Sin Tratamiento Médico', 'sub': '', 'dq': True},
    ],
  },
  's4': {
    'question': '¿Quién fue el principal responsable del accidente?',
    'hint': '(Esto nos ayuda a encontrar la mejor opción para su situación.)',
    'options': [
      {'label': 'La otra parte fue responsable', 'sub': ''},
      {'label': 'Responsabilidad compartida o poco clara', 'sub': ''},
      {'label': 'No estoy seguro', 'sub': ''},
      {'label': 'Yo fui responsable', 'sub': '', 'dq': True},
    ],
  },
  's5': {
    'question': '¿Cuenta actualmente con representación profesional?',
    'hint': '(Esto nos ayuda a encontrar la mejor opción para su situación.)',
    'options': [
      {'label': 'No, aún no tengo representación', 'sub': ''},
      {'label': 'Sí, pero estoy explorando otras opciones', 'sub': ''},
      {'label': 'Tuve representación pero ya no', 'sub': '', 'dq': True},
    ],
  },
  'footer_disclaimer': ('Este es un servicio de publicidad y no un bufete de abogados, servicio de referencia de '
    'abogados ni proveedor de asesoramiento legal. La información enviada a través de este sitio web es revisada primero '
    'por nuestro equipo de admisión. Si su situación cumple con ciertos criterios, puede ser conectado con un abogado con '
    'licencia o proveedor de servicios legales que pueda discutir sus opciones legales. Los resultados varían según los '
    'hechos y circunstancias de cada caso. Cualquier monto de compensación o acuerdo mencionado es solo para fines '
    'informativos y no garantiza resultados futuros. Los abogados generalmente trabajan sobre una base de honorarios de '
    'contingencia, lo que significa que no se deben honorarios de abogado a menos que se obtenga una recuperación. '
    'Enviar este formulario no crea una relación abogado-cliente.'),
}

with open('messages/es.json', encoding='utf-8') as f:
    es = json.load(f)
for k in ['header', 's1', 's2', 's3', 's4', 's5']:
    es['quiz'][k] = ES[k]
es['quiz']['footer']['disclaimer'] = ES['footer_disclaimer']
with open('messages/es.json', 'wb') as f:
    f.write(json.dumps(es, ensure_ascii=False, indent=2).encode('utf-8'))
print('es: header + s1-s5 + footer translated')
