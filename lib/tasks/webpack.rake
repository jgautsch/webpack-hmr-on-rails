# Run webpack:build prior to assets:clean and assets:clobber
Rake::Task["assets:clean"].enhance(["webpack:clean"])
Rake::Task["assets:clobber"].enhance(["webpack:clean"])

namespace :webpack do

  desc "Compile assets with webpack"
  task :build do
    puts "****************************** WEBPACK ******************************"
    sh "cd client && $(npm bin)/webpack --config webpack.production.config.js --optimize-dedupe; true"
  end

  task :clean do
    files_path = "#{Timer::Application.config.root}/app/assets/javascripts/generated/*_webpack_bundle.js"
    Dir[files_path].each { |file| FileUtils.rm file }
  end

end
