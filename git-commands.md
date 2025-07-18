# Comandos Git útiles para tu proyecto

## Ver estado actual
git status                          # Ver archivos modificados
git log --oneline                   # Ver historial de commits
git log --graph --oneline --all     # Ver historial gráfico

## Guardar cambios
git add .                           # Agregar todos los cambios
git add archivo.ts                  # Agregar archivo específico
git commit -m "Mensaje descriptivo" # Crear commit

## Volver atrás
git checkout -- archivo.ts         # Descartar cambios en archivo
git checkout -- .                  # Descartar todos los cambios
git reset --soft HEAD~1            # Volver 1 commit (mantiene cambios)
git reset --hard HEAD~1            # Volver 1 commit (elimina cambios)
git reset --hard <hash_commit>     # Volver a commit específico

## Ramas (para experimentar)
git branch nueva-funcionalidad     # Crear rama
git checkout nueva-funcionalidad   # Cambiar a rama
git checkout -b nueva-rama         # Crear y cambiar a rama
git merge nueva-funcionalidad      # Fusionar rama
git branch -d nueva-funcionalidad  # Eliminar rama

## Comparar
git diff                           # Ver diferencias no guardadas
git diff --staged                  # Ver diferencias en staging
git diff HEAD~1                    # Comparar con commit anterior

## Información
git show <hash_commit>             # Ver detalles de un commit
git blame archivo.ts               # Ver quién modificó cada línea
