# 🗡️ Forjando Héroe

Un juego de rol interactivo desarrollado en Angular donde puedes crear personajes de diferentes clases y enfrentarlos en épicos combates.

## 🎮 Características

- **Creación de Personajes**: Crea héroes únicos con diferentes clases disponibles
- **Sistema de Combate**: Combates por turnos con mecánicas de ataque y defensa
- **Múltiples Clases**: Elige entre diferentes clases de personajes:
  - 🪓 **Barbarian**: Alta fuerza y resistencia
  - 🧙‍♂️ **Wizard**: Magia poderosa pero frágil
  - 🏹 **Ranger**: Equilibrado y ágil
  - 🗡️ **Rogue**: Rápido y sigiloso
  - 🛡️ **Paladin**: Defensor sagrado
- **Historial de Batallas**: Registro de todas tus victorias
- **Interfaz Responsiva**: Diseño adaptativo para diferentes dispositivos

## 🛠️ Tecnologías Utilizadas

- **Angular 19.2**: Framework principal
- **TypeScript**: Lenguaje de programación
- **SCSS**: Preprocesador CSS
- **Firebase Hosting**: Despliegue y hosting
- **D&D API**: Integración con API de Dungeons & Dragons

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- Angular CLI

### Pasos de instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/sleepUptime/juego.git
   cd juego
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Ejecuta el servidor de desarrollo**
   ```bash
   npm start
   ```

4. **Abre tu navegador**
   Navega a `http://localhost:4200/`

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm test` | Ejecuta las pruebas unitarias |
| `npm run watch` | Construye en modo observación |

## 🎯 Cómo Jugar

1. **Crear Personaje**: Selecciona una clase y personaliza tu héroe
2. **Iniciar Combate**: Enfréntate contra enemigos generados aleatoriamente
3. **Combate por Turnos**: Usa estrategia para atacar, defenderte o huir
4. **Ganar Experiencia**: Acumula victorias en tu historial de batallas

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── component/
│   │   ├── creacion-personaje/    # Creación de personajes
│   │   ├── combate/               # Sistema de combate
│   │   ├── home/                  # Página principal
│   │   └── expansion/             # Futuras expansiones
│   ├── model/
│   │   └── personaje.ts           # Modelo de personaje
│   └── service/
│       ├── forjando-heroe.service.ts      # Lógica del juego
│       └── dungeons-and-dragons-api.service.ts  # API externa
└── assets/                        # Imágenes y recursos
```

## 🚀 Despliegue

La aplicación está configurada para desplegarse automáticamente en Firebase Hosting:

```bash
ng build --prod
firebase deploy
```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🐛 Reportar Bugs

Si encuentras algún error, por favor abre un [issue](https://github.com/sleepUptime/juego/issues) describiendo:
- Pasos para reproducir el error
- Comportamiento esperado vs actual
- Screenshots si es posible

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**sleepUptime** - [GitHub Profile](https://github.com/sleepUptime)

## 🙏 Agradecimientos

- Angular Team por el excelente framework
- D&D API por proporcionar datos de referencia
- Comunidad de desarrolladores por su apoyo

---

⭐ ¡Si te gusta este proyecto, no olvides darle una estrella en GitHub!
