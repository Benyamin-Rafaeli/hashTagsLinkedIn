FROM cypress/base:10
WORKDIR /e2e
COPY cypress cypress
COPY cypress.json .
COPY package.json .
COPY package-lock.json .

RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify

ENTRYPOINT ["npm", "run", "-s", "cypress:run", "-e", "username=$TESTUSERNAME,password=$TESTPASSWORD"]
