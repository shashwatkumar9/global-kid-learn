
-- Add comprehensive US curriculum content with multiple subjects and grades (fixed escaping)

-- Insert Common Core Mathematics content for multiple grades
INSERT INTO public.educational_content (subject, grade, curriculum, country, content_type, title, content, is_premium) VALUES
-- Grade K Mathematics
('Mathematics', 'Grade K', 'Common Core', 'USA', 'theory', 'Counting and Cardinality Basics', 
'Kindergarten mathematics focuses on developing number sense and basic counting skills that form the foundation for all future mathematical learning.

**Understanding Numbers 0-20**
Children begin their mathematical journey by learning to count from 0 to 20. This involves not just memorizing the sequence, but understanding that each number represents a specific quantity. Students learn to:
- Count objects one by one
- Recognize written numerals
- Understand that the last number counted tells "how many"
- Compare quantities using terms like "more," "less," and "equal"

**One-to-One Correspondence**
This fundamental concept teaches children that each object being counted corresponds to exactly one number word. Students practice:
- Touching each object once while counting
- Understanding that moving objects does not change the quantity
- Recognizing that arrangement does not affect the count

**Counting Forward and Backward**
Students learn to count in both directions, which builds number sense and prepares them for addition and subtraction:
- Forward counting from any given number
- Backward counting (countdown)
- Skip counting by 2s and 5s
- Identifying patterns in number sequences

**Number Recognition and Writing**
Beyond counting, students must recognize and write numerals:
- Identifying numbers in different fonts and contexts
- Writing numbers correctly with proper formation
- Matching numerals to quantities
- Understanding that numbers have consistent meaning

**Comparing Quantities**
Students develop the ability to compare groups of objects:
- Using comparison words: more, less, fewer, same
- Arranging objects to make comparisons easier
- Understanding that numbers can be compared by value
- Making equal groups through adding or removing objects

**Practical Applications**
Kindergarten math connects to daily experiences:
- Counting snacks or toys
- Comparing ages with friends
- Understanding calendar concepts
- Following recipes with simple measurements

This foundation prepares students for more complex mathematical concepts in first grade and beyond, ensuring they have the number sense necessary for success in mathematics.', false),

-- Grade 1 Mathematics (additional content)
('Mathematics', 'Grade 1', 'Common Core', 'USA', 'theory', 'Addition and Subtraction Within 20', 
'First grade mathematics builds upon kindergarten foundations by introducing formal addition and subtraction operations within 20, developing both conceptual understanding and computational fluency.

**Understanding Addition**
Addition is combining groups to find the total amount. Students learn through multiple approaches:
- Concrete manipulation with objects and toys
- Visual representations using pictures and diagrams
- Abstract number sentences and equations
- Real-world problem-solving scenarios

**Addition Strategies**
Students develop various strategies for adding numbers:
- Counting on from the larger number
- Using fingers and other manipulatives
- Creating mental pictures of quantities
- Recognizing doubles (5+5=10) and near-doubles (5+6=11)
- Making ten strategy (7+5 = 7+3+2 = 10+2 = 12)

**Understanding Subtraction**
Subtraction involves taking away, finding differences, or determining missing parts:
- Take away situations: "I had 8 cookies and ate 3. How many are left?"
- Comparison situations: "Tom has 9 stickers and Sue has 6. How many more does Tom have?"
- Missing addend situations: "I need 10 apples and have 7. How many more do I need?"

**Subtraction Strategies**
Students learn multiple approaches to subtraction:
- Counting back from the starting number
- Counting up from the smaller to the larger number
- Using the relationship between addition and subtraction
- Think addition strategy: For 12-5, think "5 + ? = 12"

**Fact Families**
Students explore the relationships between addition and subtraction:
- Understanding that 3+5=8, 5+3=8, 8-3=5, and 8-5=3 are related
- Using known facts to solve unknown problems
- Recognizing patterns in number relationships

**Word Problems**
First graders solve various types of story problems:
- Result unknown: "Maria has 5 apples. Her friend gives her 3 more. How many does she have now?"
- Change unknown: "Carlos had some marbles. He gave away 4 and now has 7. How many did he start with?"
- Start unknown: "After buying 6 new books, Jenny has 12 books total. How many did she have before?"

**Properties of Operations**
Students begin to understand mathematical properties:
- Commutative property: 4+6 = 6+4
- Identity property: Any number plus 0 equals that number
- Associative property: (2+3)+4 = 2+(3+4)

These concepts prepare students for more complex operations and algebraic thinking in future grades.', false),

-- Grade 2 Mathematics
('Mathematics', 'Grade 2', 'Common Core', 'USA', 'theory', 'Place Value and Three-Digit Numbers', 
'Second grade mathematics focuses heavily on place value understanding, which is crucial for success with larger numbers and multi-digit arithmetic operations.

**Understanding Place Value**
Place value is the foundation of our number system, where the position of a digit determines its value:
- Ones place: Each digit represents individual units
- Tens place: Each digit represents groups of ten
- Hundreds place: Each digit represents groups of one hundred

**Reading and Writing Numbers to 1000**
Students learn to work with three-digit numbers:
- Reading numbers in standard form (347)
- Writing numbers in expanded form (300 + 40 + 7)
- Using word form (three hundred forty-seven)
- Understanding that zero holds a place but adds no value

**Comparing Three-Digit Numbers**
Students develop skills in comparing larger numbers:
- Using comparison symbols: >, <, =
- Comparing digits starting from the highest place value
- Understanding that a three-digit number is always greater than a two-digit number
- Ordering numbers from least to greatest or greatest to least

**Counting Patterns**
Second graders extend their counting skills:
- Skip counting by 5s, 10s, and 100s
- Counting by 2s to prepare for even/odd concepts
- Forward and backward counting within 1000
- Identifying and extending number patterns

**Regrouping Concepts**
Students begin to understand trading between place values:
- 10 ones equal 1 ten
- 10 tens equal 1 hundred
- Using base-ten blocks to visualize regrouping
- Mental math strategies using place value

**Estimation and Rounding**
Students develop number sense through estimation:
- Rounding to the nearest 10
- Estimating quantities before counting
- Using benchmark numbers (25, 50, 75, 100)
- Determining reasonableness of answers

**Real-World Applications**
Place value connects to everyday experiences:
- Understanding money values (dollar bills, dimes, pennies)
- Reading addresses and phone numbers
- Measuring distances and weights
- Understanding calendar dates and years

**Mental Math Strategies**
Students develop efficient calculation methods:
- Adding 10 or 100 to any number
- Subtracting 10 or 100 from any number
- Using friendly numbers for estimation
- Breaking apart numbers for easier computation

This deep understanding of place value prepares students for multi-digit addition and subtraction with regrouping in future grades.', false);

-- Insert sample questions for comprehensive assessment
INSERT INTO public.questions (subject, grade, curriculum, country, question_type, question_text, options, correct_answer, explanation, is_premium) VALUES
-- Kindergarten Mathematics Questions
('Mathematics', 'Grade K', 'Common Core', 'USA', 'quiz', 'Count the stars in the picture. How many stars are there?', 
'["4 stars", "5 stars", "6 stars", "7 stars"]', '5 stars', 'Count each star carefully. There are 5 stars total.', false),

('Mathematics', 'Grade K', 'Common Core', 'USA', 'quiz', 'Which number comes before 8?', 
'["6", "7", "9", "10"]', '7', 'When counting: 6, 7, 8, 9. The number 7 comes right before 8.', false),

('Mathematics', 'Grade K', 'Common Core', 'USA', 'quiz', 'Which group has MORE apples?', 
'["Group A (3 apples)", "Group B (5 apples)", "They are the same", "Cannot tell"]', 'Group B (5 apples)', 'Group B has 5 apples and Group A has 3 apples. 5 is more than 3.', false),

-- Grade 1 Mathematics Questions
('Mathematics', 'Grade 1', 'Common Core', 'USA', 'quiz', 'What is 7 + 5?', 
'["11", "12", "13", "14"]', '12', 'You can count on: 7, 8, 9, 10, 11, 12. Or use the make 10 strategy: 7 + 3 + 2 = 10 + 2 = 12.', false),

('Mathematics', 'Grade 1', 'Common Core', 'USA', 'quiz', 'What is 15 - 6?', 
'["8", "9", "10", "11"]', '9', 'You can count back from 15: 14, 13, 12, 11, 10, 9. Or think: 6 + 9 = 15, so 15 - 6 = 9.', false),

('Mathematics', 'Grade 1', 'Common Core', 'USA', 'exam', 'Tom has 8 toy cars. He gives 3 to his brother. How many toy cars does Tom have left?', 
'["4 toy cars", "5 toy cars", "6 toy cars", "11 toy cars"]', '5 toy cars', 'This is a subtraction problem: 8 - 3 = 5 toy cars remaining.', true),

-- Grade 2 Mathematics Questions
('Mathematics', 'Grade 2', 'Common Core', 'USA', 'quiz', 'What is the value of the 4 in the number 342?', 
'["4", "40", "400", "4000"]', '40', 'The 4 is in the tens place, so its value is 4 tens = 40.', false),

('Mathematics', 'Grade 2', 'Common Core', 'USA', 'quiz', 'Which number is greater: 156 or 165?', 
'["156", "165", "They are equal", "Cannot tell"]', '165', 'Compare the hundreds (both 1), then tens: 5 vs 6. Since 6 > 5, then 165 > 156.', false);
