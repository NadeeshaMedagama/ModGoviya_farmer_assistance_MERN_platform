require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected for password migration');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Import the User model
const User = require('./models/User');

// Function to check if a string is already hashed
function isHashedPassword(password) {
    // bcrypt hashes start with $2a$, $2b$, or $2y$ and are 60 characters long
    return password && password.startsWith('$2') && password.length === 60;
}

// Function to migrate passwords
async function migratePasswords() {
    try {
        console.log('Starting password migration...');
        
        // Find all users with plain text passwords
        const users = await User.find({});
        console.log(`Found ${users.length} users to check`);
        
        let migratedCount = 0;
        let alreadyHashedCount = 0;
        let errorCount = 0;
        
        for (const user of users) {
            try {
                if (user.password && !isHashedPassword(user.password)) {
                    console.log(`Migrating password for user: ${user.email}`);
                    
                    // Hash the plain text password
                    const salt = await bcrypt.genSalt(12);
                    const hashedPassword = await bcrypt.hash(user.password, salt);
                    
                    // Update the user with the hashed password
                    await User.updateOne(
                        { _id: user._id },
                        { $set: { password: hashedPassword } }
                    );
                    
                    migratedCount++;
                    console.log(`✅ Successfully migrated password for: ${user.email}`);
                } else if (user.password) {
                    alreadyHashedCount++;
                    console.log(`ℹ️  Password already hashed for: ${user.email}`);
                } else {
                    console.log(`ℹ️  No password found for: ${user.email} (OAuth user)`);
                }
            } catch (error) {
                errorCount++;
                console.error(`❌ Error migrating password for ${user.email}:`, error.message);
            }
        }
        
        console.log('\n=== Password Migration Summary ===');
        console.log(`Total users processed: ${users.length}`);
        console.log(`Passwords migrated: ${migratedCount}`);
        console.log(`Already hashed: ${alreadyHashedCount}`);
        console.log(`Errors: ${errorCount}`);
        console.log('================================\n');
        
        if (errorCount === 0) {
            console.log('🎉 Password migration completed successfully!');
            console.log('All plain text passwords have been securely hashed with bcrypt.');
        } else {
            console.log('⚠️  Password migration completed with some errors.');
            console.log('Please check the logs above for details.');
        }
        
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        // Close the database connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    }
}

// Function to verify migration
async function verifyMigration() {
    try {
        console.log('Verifying password migration...');
        
        const users = await User.find({});
        let plainTextCount = 0;
        let hashedCount = 0;
        let noPasswordCount = 0;
        
        for (const user of users) {
            if (user.password) {
                if (isHashedPassword(user.password)) {
                    hashedCount++;
                } else {
                    plainTextCount++;
                    console.log(`⚠️  Plain text password found for: ${user.email}`);
                }
            } else {
                noPasswordCount++;
            }
        }
        
        console.log('\n=== Migration Verification ===');
        console.log(`Total users: ${users.length}`);
        console.log(`Hashed passwords: ${hashedCount}`);
        console.log(`Plain text passwords: ${plainTextCount}`);
        console.log(`No passwords (OAuth): ${noPasswordCount}`);
        
        if (plainTextCount === 0) {
            console.log('✅ All passwords are properly hashed!');
        } else {
            console.log('❌ Some passwords are still in plain text!');
        }
        console.log('==============================\n');
        
    } catch (error) {
        console.error('Verification failed:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    }
}

// Check command line arguments
const command = process.argv[2];

if (command === 'verify') {
    verifyMigration();
} else if (command === 'migrate') {
    migratePasswords();
} else {
    console.log('Password Migration Script');
    console.log('Usage:');
    console.log('  node migratePasswords.js migrate  - Migrate plain text passwords to hashed');
    console.log('  node migratePasswords.js verify   - Verify that all passwords are hashed');
    console.log('');
    console.log('⚠️  WARNING: This script will modify user passwords in the database.');
    console.log('   Make sure you have a backup before running the migration.');
    console.log('');
    console.log('Example:');
    console.log('  node migratePasswords.js migrate');
    process.exit(0);
}
