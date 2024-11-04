import {MongoClient} from 'mongodb';

export async function crudExample(mongoClient: MongoClient) {
    const db = mongoClient.db('database-1');

    const prescription = db.collection('prescription');

    await prescription.insertOne({
        name: 'drug-1',
        dosage: 1,
        dosageUnit: 'pill'
    });

    let prescriptions = await prescription.find({name: 'drug-1'}).toArray();
    console.log('Prescriptions:', prescriptions);

    const updateResult = await prescription.updateOne(
        {name: 'drug-1'},
        {$set: {dosage: 2}}
    );
    console.log('Number of prescriptions matched:', updateResult.matchedCount);
    console.log('Number of prescriptions modified:', updateResult.modifiedCount);

    prescriptions = await prescription.find({name: 'drug-1'}).toArray();
    console.log('Prescriptions:', prescriptions);

    const deleteResult = await prescription.deleteOne({name: 'drug-1'});
    console.log('Number of prescriptions deleted:', deleteResult.deletedCount);
}
