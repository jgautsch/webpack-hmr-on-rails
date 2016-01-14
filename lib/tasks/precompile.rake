# Run webpack:build prior to assets:precompile
Rake::Task["assets:precompile"].enhance(["webpack:build"])
