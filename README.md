# documentdb-test

This repo provides examples of connecting to a DocumentDB database and doing CRUD operations using Mongo and Mongoose styles.

## Background

A DocumentDB database does not allow direct connections to it from outside the VPC in which in resides. The example code uses an SSH tunnel through a bastion server to connect to the database. Thus, in order to run the example code from your local computer, you need both a DocumentDB database and a bastion server in the same VPC to be available.

## Prepare Collection

The example code expects the `prescriptions` collection to exist in the database.

The example collection shows how to use DocumentDB JSON schema validation and is created with this command in Mongosh after selecting a database:

Before running the example code, create the `prescriptions` collection.

```
db.createCollection("prescriptions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "dosage", "dosageUnit"],
      properties: {
        name: {
          bsonType: "string",
          description: "Drug name"
        },
        dosage: {
          bsonType: "int",
          minimum: 1,
          description: "Drug dosage"
        },
        dosageUnit: {
          bsonType: "string",
          enum: ["mg", "pill"],
          description: "Drug dosage unit"
        }
      }
    }
  }
})
```

## Configure Example

Besides the compiled Typescript code, the example code expects two files to exist in the `dist` folder.

### .env File

The .env file should have the following fields:

```
MONGODB_DATABASE="your-database-name"
MONGODB_HOST="127.0.0.1"
MONGODB_PASSWORD="your-password"
MONGODB_TLS_CA_FILE="your-tls-cs-pem-file-name"
MONGODB_USERNAME="your-username"
MONGODB_USE_SSH_TUNNEL=true
```

Set the fields prefixed with `your-` to the appropriate values for your environment.

The `MONGODB_HOST` and `MONGODB_USE_SSH_TUNNEL` values are correct for connecting through an SSH tunnel from your local computer.

### SSL/TLS Certificate Authority File

Copy the SSL/TLS Certificate Authority (CA) file for your DocumentDB instance to the `dist` folder. In AWS examples, this file is often shown as `global-bundle.pem`.

Use the file name of the file for the `.env` file `MONGODB_TLS_CA_FILE` field.

## Establish SSH Tunnel

Before running the example code, you need to establish an SSH tunnel to the DocumentDB instance. This may be done with a command like the following:

```
ssh -i bastion-server-pem-file-name -N -L 27017:documentdb-cluster-url:27017 bastion-server-url
```

### bastion-server-pem-file-name

Tne file specification of the bastion server PEM file downloaded to your computer.

### documentdb-cluster-url

The DocumentDB URL for the database. As an example, for my test database the URL was `aetna-test-docdb.cluster-cwmerlckvzbk.us-west-2.docdb.amazonaws.com`.

### bastion-server-url

The URL of the bastion server you wish to use to connect to the database. As an example, for my test bastion server the URL was `ubuntu@ec2-35-87-54-208.us-west-2.compute.amazonaws.com`.