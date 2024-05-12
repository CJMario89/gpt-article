pipeline {
    agent any

    stages {
        stage("Restore npm packages") {
            steps {
                // Writes lock-file to cache based on the GIT_COMMIT hash
                writeFile file: "next-lock.cache", text: "$GIT_COMMIT"
         
                cache(caches: [
                    arbitraryFileCache(
                        path: "node_modules",
                        includes: "**/*",
                        cacheValidityDecidingFile: "package-lock.json"
                    )
                ]) {
                    sh "npm install"
                }
            }
        }

        stage("Build") {
            steps {
                // Writes lock-file to cache based on the GIT_COMMIT hash
                writeFile file: "next-lock.cache", text: "$GIT_COMMIT"
         
                cache(caches: [
                    arbitraryFileCache(
                        path: ".next/cache",
                        includes: "**/*",
                        cacheValidityDecidingFile: "next-lock.cache"
                    )
                ]) {
                    // aka `next build`
                    sh "npm run build"
                }
            }
        }
        //// change to manual start
        // stage("Start Application") {
        //     steps {
        //         script {
        //             // Stop any running instances of the application
        //             sh "pm2 delete all || true" // Replace <app_name> with the name of your application managed by pm2
                    
        //             // Start the application with pm2
        //             sh "pm2 start 'npm run start'" // Replace <app_name> with the name of your application managed by pm2
        //         }
        //     }
        // }
    }
}
