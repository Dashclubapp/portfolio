#!/bin/bash
# =============================================================
# Script de sauvegarde mensuelle — DashClub
# Usage : ./scripts/backup.sh
# Génère : dashclub-backup-YYYY-MM.zip dans le répertoire courant
# =============================================================

set -e

# --- Configuration ---
BACKUP_NAME="dashclub-backup-$(date +%Y-%m)"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUT_DIR="${BACKUP_OUTPUT_DIR:-$REPO_ROOT}"
OUTPUT_FILE="$OUTPUT_DIR/$BACKUP_NAME.zip"

# --- Couleurs pour la lisibilité ---
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Sauvegarde DashClub — $(date +%B\ %Y)${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# --- Vérification des prérequis ---
if ! command -v zip &> /dev/null; then
    echo -e "${RED}ERREUR: La commande 'zip' n'est pas installée.${NC}"
    echo "Installez-la avec : sudo apt-get install zip (Linux) ou brew install zip (Mac)"
    exit 1
fi

echo -e "${YELLOW}→ Répertoire source :${NC} $REPO_ROOT"
echo -e "${YELLOW}→ Fichier de sortie :${NC} $OUTPUT_FILE"
echo ""

mkdir -p "$OUTPUT_DIR"

# --- Créer le ZIP ---
echo -e "${BLUE}Création de l'archive...${NC}"

cd "$REPO_ROOT"

ZIP_EXCLUDES=(
    "*.git*"
    "node_modules/*"
    ".next/*"
    ".agents/*"
    "backups/*"
    "*.DS_Store"
    "*.env.local"
    "*.env*.local"
)

case "$OUTPUT_FILE" in
    "$REPO_ROOT"/*)
        REL_OUTPUT_FILE="${OUTPUT_FILE#$REPO_ROOT/}"
        ZIP_EXCLUDES+=("$REL_OUTPUT_FILE")
        ;;
esac

ZIP_ARGS=()
for pattern in "${ZIP_EXCLUDES[@]}"; do
    ZIP_ARGS+=(--exclude "$pattern")
done

zip -r "$OUTPUT_FILE" . "${ZIP_ARGS[@]}" -q

# --- Vérification ---
if [ -f "$OUTPUT_FILE" ]; then
    SIZE=$(du -sh "$OUTPUT_FILE" | cut -f1)
    FILE_COUNT=$(unzip -l "$OUTPUT_FILE" | tail -1 | awk '{print $2}')

    echo -e "${GREEN}✓ Archive créée avec succès !${NC}"
    echo ""
    echo -e "  Fichier  : ${BLUE}$BACKUP_NAME.zip${NC}"
    echo -e "  Taille   : $SIZE"
    echo -e "  Fichiers : $FILE_COUNT fichiers inclus"
    echo ""

    # Vérification des dossiers clés
    echo -e "${BLUE}Vérification du contenu...${NC}"

    CHECK_OK=true
    for dir in "app/" "public/" "components/" "package.json"; do
        if unzip -l "$OUTPUT_FILE" | grep -q "$dir" 2>/dev/null; then
            echo -e "  ${GREEN}✓${NC} $dir présent"
        else
            echo -e "  ${RED}✗${NC} $dir MANQUANT"
            CHECK_OK=false
        fi
    done

    echo ""
    if [ "$CHECK_OK" = true ]; then
        echo -e "${GREEN}✓ Sauvegarde complète et valide.${NC}"
    else
        echo -e "${YELLOW}⚠ Certains fichiers semblent manquants. Vérifiez manuellement.${NC}"
    fi

    echo ""
    echo -e "${YELLOW}Prochaine étape :${NC} Déposez $BACKUP_NAME.zip dans Google Drive → DashClub — Sauvegardes"
else
    echo -e "${RED}ERREUR: Le fichier ZIP n'a pas été créé.${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Terminé — $(date '+%d/%m/%Y à %H:%M')${NC}"
echo -e "${BLUE}========================================${NC}"
