# haha hi python

import json
import os
import itertools

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))


def abs_path(filename):
    return os.path.join(__location__, filename)


def remove_at(index: int, s: str):
    return s[:index] + s[index + 1 :]


def word_combinations(wordset, letters):
    c = [
        "".join(combination)
        for i in range(len(letters))
        for combination in itertools.combinations(letters, i + 1)
    ]
    queries = []
    words = set()
    for query in c:
        try:
            words.update(wordset[query])
            queries.append(query)
        except KeyError:
            pass
    return (words, queries)


def parse_pangram_letter_scores(letters: str, wordset: dict):
    info = {}
    all_words, all_queries = word_combinations(wordset, letters)
    for index, letter in enumerate(letters):
        remaining_letters = remove_at(index, letters)
        remaining_words, remaining_queries = word_combinations(wordset, remaining_letters)
        try:
            # info[letter] = math.log(len(all_words.difference(remaining_words)), 2)
            info[letter] = len(all_words.difference(remaining_words))
        except KeyError:
            print("Couldn't print info for", letter, "in pangram", letters)
    info["_total"] = len(all_words)
    info["_queries"] = all_queries
    return info


class BeeWord(str):
    """Extends str. Applies various utility functions to assist in selecting words for puzzles."""
    def isalpha(self):
        """Returns true if string contains alphabetical characters only."""
        return self.encode("ascii").isalpha()

    def letters(self):
        """Returns set of letters in string."""
        return set(self)

    def isvalid(self):
        """Returns true if valid for Spelling Bee, i.e. word is alphabetical, length is 4 or greater, uses 7 or fewer letters"""
        return self.isalpha() and len(self) >= 4 and len(self.letters()) <= 7

    def ispangram(self):
        """Returns true if valid pangram, i.e. word is alphabetical and uses 7 letters exactly"""
        return self.isalpha() and len(self.letters()) == 7
    
    def isperfect(self):
        """Returns true if perfect pangram, i.e. word is alphabetical, uses 7 letters exactly, and is exactly 7 letters long"""
        return self.ispangram() and len(self) == 7


def prepare_data(wordlist_filename: str):
    """Prepares json files of provided wordlist file. Must be in same folder."""
    with open(os.path.join(__location__, "mobycrossword.txt")) as file:
        complete_dictionary = {}
        pangram_dictionary = {}
        perfect_dictionary = {}
        for line in file:
            w = BeeWord(line.strip())
            if w.isperfect():
                s = "".join(sorted(list(w.letters())))
                try:
                    perfect_dictionary[s].append(w)
                except KeyError:
                    perfect_dictionary[s] = [w]
            if w.ispangram():
                s = "".join(sorted(list(w.letters())))
                try:
                    pangram_dictionary[s].append(w)
                except KeyError:
                    pangram_dictionary[s] = [w]
            if w.isvalid():
                s = "".join(sorted(list(w.letters())))
                try:
                    complete_dictionary[s].append(w)
                except KeyError:
                    complete_dictionary[s] = [w]
        complete_dictionary = {
            k: complete_dictionary[k] for k in sorted(complete_dictionary.keys())
        }
        pangram_dictionary = {
            k: pangram_dictionary[k] for k in sorted(pangram_dictionary.keys())
        }
        perfect_dictionary = {
            k: perfect_dictionary[k] for k in sorted(perfect_dictionary.keys())
        }
        with open(os.path.join(__location__, "wordset.json"), "w") as out:
            json.dump(complete_dictionary, out)
        with open(os.path.join(__location__, "pangrams.json"), "w") as out:
            json.dump(pangram_dictionary, out)
        with open(abs_path("perfects.json"), "w") as out:
            json.dump(perfect_dictionary, out)


def allocate_pangram_scores():
    score_data = {}
    with open(abs_path("perfects.json")) as pangram_data, open(
        abs_path("wordset.json")
    ) as wordset_data, open(abs_path("scores.json"), "w") as scores_file:
        pangrams = json.load(pangram_data)
        wordset = json.load(wordset_data)
        for i, key in enumerate(pangrams.keys()):
            info = parse_pangram_letter_scores(key, wordset)
            score_data[key] = info
        json.dump(score_data, scores_file)
    
# def score_reporting():
#     with open(abs_path("scores.json")) as scores_file:
#         scores = json.load(scores_file)
#         score_max = 0
#         pangram_max = ""
#         bound_50 = 0
#         bound_100 = 0
#         bound_150 = 0
#         bound_200 = 0
#         others = 0
#         for i, item in enumerate(scores):
#             if scores[item]["_total"] < 50:
#                 score_max = scores[item]["_total"]
#                 pangram_max = item
#         print(score_max, pangram_max)

def file_reporting():
    with open(abs_path("perfects.json")) as perfects_data, open(abs_path("pangrams.json")) as pangrams_data:
        perfects = json.load(perfects_data)
        pangrams = json.load(pangrams_data)
        print(len(perfects))
        print(len(pangrams))
    
    with open(abs_path("mobycrossword.txt")) as file:
        bees = []
        for line in file:
            w = BeeWord(line.strip())
            if w.isvalid():
                bees.append(w)
        with open(abs_path("bee_mobycrossword.txt"), "w") as out:
            out.write('\n'.join(bees))




if __name__ == "__main__":
    allocate_pangram_scores()
    pass

# 5874 perfects
# 13333 pangrams
# 82625 words