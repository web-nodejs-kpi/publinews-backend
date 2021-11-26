if [ ! -f .env ]; then
    echo "Seems you have not filled .env file"
    cp .env.example .env
    exit 1
fi

echo "Installing packages"
npm i
echo "Preparing husky hooks"
npm run prepare

read -r -p "Create DB (y/N): "
if [[ "$REPLY" =~ ^([yY][eE][sS]|[yY])$ ]]
then
    node ./src/db/setup/create_db.js
fi

read -r -p "Fill DB (y/N): "
if [[ "$REPLY" =~ ^([yY][eE][sS]|[yY])$ ]]
then
    node ./src/db/setup/fill_db.js
fi