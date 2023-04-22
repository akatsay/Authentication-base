# Authentication-base
## Base for website authentication mechanism + account settings 

#### To deploy and test on local machine do the following:
  1) In the command line after changing directory to the folder of your preference run: git clone https://github.com/akatsay/Authentication-base.git
  2) Create mongodb data cluster
  3) In the root folder create file and name it .env and fill it according to the template below
  4) Run script: "npm run dev" in the command line
  5) Enjoy! :)
  
#### env file template:
    ```
    DEV_PORT="5000" // whatever port you prefer to use to run apps on your local machine <br />
    JWT_SECRET="Whatever" // it can be any text you want it to be <br />
    MONGO_URL="..." - /* after creating mongodb cluster: <br />
    click connect -> drivers -> choose node.js 4.1 or later -> below you will see a link, copy and paste it in this <br />
    env field, make sure to fill <password> placeholder in this link with your mongodb password <br />
    /*
    ```
