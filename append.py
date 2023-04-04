filepath = "4l_words.js"
with open(filepath) as f:
    lines = f.read().splitlines()

with open(filepath, "w") as f:
    for line in lines:
        f.write(line[1:5] + "\n")