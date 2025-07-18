# Verificar estado de Git y GitHub

## Ver información del repositorio
git status                    # Estado actual local
git log --oneline            # Historial local de commits
git remote -v                # Ver repositorios remotos configurados

## Después de configurar GitHub
git log --oneline --all      # Ver todos los commits (local y remoto)
git branch -a                # Ver todas las ramas (local y remoto)

## Comparar local vs GitHub
git status                   # Ver si hay cambios pendientes de subir
git log origin/main..HEAD    # Ver commits locales no subidos a GitHub
git log HEAD..origin/main    # Ver commits en GitHub que no tienes local

## Subir y bajar cambios
git push                     # Subir commits locales a GitHub
git pull                     # Bajar cambios de GitHub a local
git fetch                    # Solo descargar info (no aplicar cambios)
