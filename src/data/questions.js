export const MOCK_QUESTIONS = {
  python: {
    'Functions & Scope': [
      {
        id: 101,
        question: 'What is the output of the following Python code?',
        code: `def calc(a, b=5):\n    return a * b\n\nprint(calc(3))`,
        options: [
          '8',
          '15',
          'TypeError: b is missing',
          'None'
        ],
        correctAnswer: 1, // index 1 = '15'
        explanation: 'The function calc has a default parameter b=5. When calc(3) is called, a is assigned 3, and b defaults to 5. 3 * 5 = 15.'
      },
      {
        id: 102,
        question: 'Which keyword is used to modify a variable outside the current scope in a Python function?',
        code: null,
        options: [
          'extern',
          'global',
          'var',
          'scope'
        ],
        correctAnswer: 1,
        explanation: 'The "global" keyword allows a function to modify variables defined outside the local function scope.'
      },
      {
        id: 103,
        question: 'What does *args allow you to do in Python function parameters?',
        code: null,
        options: [
          'Pass keyword arguments as a dictionary',
          'Pass a variable number of positional arguments as a tuple',
          'Multiply all function arguments together',
          'Declare pointer arguments'
        ],
        correctAnswer: 1,
        explanation: '*args allows passing a variable number of non-keyword (positional) arguments to a function as a tuple.'
      },
      {
        id: 104,
        question: 'What is the output of the following code involving lambda functions?',
        code: `square = lambda x: x ** 2\nprint(square(4))`,
        options: [
          '8',
          '16',
          '42',
          'SyntaxError'
        ],
        correctAnswer: 1,
        explanation: 'lambda x: x ** 2 computes 4 squared, which returns 16.'
      },
      {
        id: 105,
        question: 'In Python, what is a closure?',
        code: null,
        options: [
          'A function that closes the program execution',
          'A nested function that retains access to variables from its enclosing scope',
          'A class method that overrides a parent method',
          'A built-in module for file input/output'
        ],
        correctAnswer: 1,
        explanation: 'A closure is a function object that remembers values in enclosing scopes even if they are not present in memory.'
      }
    ],
    'Recursion': [
      {
        id: 106,
        question: 'What happens if a recursive function does not have a base case?',
        code: null,
        options: [
          'It returns 0 automatically',
          'It runs in O(1) time complexity',
          'It results in a RecursionError (Stack Overflow)',
          'It gets converted into a while loop by Python'
        ],
        correctAnswer: 2,
        explanation: 'Without a base case, recursion will continue infinitely until Python hits maximum call stack depth, throwing a RecursionError.'
      },
      {
        id: 107,
        question: 'What is the output of this recursive function call for factorial(3)?',
        code: `def fact(n):\n    if n <= 1: return 1\n    return n * fact(n - 1)\n\nprint(fact(3))`,
        options: [
          '3',
          '6',
          '9',
          '1'
        ],
        correctAnswer: 1,
        explanation: 'fact(3) = 3 * fact(2) = 3 * (2 * fact(1)) = 3 * 2 * 1 = 6.'
      },
      {
        id: 108,
        question: 'What technique is commonly used to optimize recursive functions by caching subproblem results?',
        code: null,
        options: [
          'Iteration',
          'Memoization',
          'Generalization',
          'Garbage Collection'
        ],
        correctAnswer: 1,
        explanation: 'Memoization caches the results of expensive recursive calls so subproblems are not recomputed.'
      }
    ],
    'Variables & Data Types': [
      {
        id: 109,
        question: 'Which of the following data types in Python is immutable?',
        code: null,
        options: [
          'List',
          'Tuple',
          'Dictionary',
          'Set'
        ],
        correctAnswer: 1,
        explanation: 'Tuples are immutable sequence types in Python; once created, their elements cannot be changed.'
      }
    ]
  },
  dbms: {
    'Normalization (1NF to BCNF)': [
      {
        id: 201,
        question: 'What primary issue does 1NF (First Normal Form) eliminate?',
        code: null,
        options: [
          'Partial functional dependencies',
          'Repeating groups and multi-valued attributes',
          'Transitive dependencies',
          'Foreign key mismatches'
        ],
        correctAnswer: 1,
        explanation: '1NF requires all attributes to hold atomic (single-valued) values and eliminates repeating groups of fields.'
      },
      {
        id: 202,
        question: 'A table is in 2NF if it is in 1NF and has no:',
        code: null,
        options: [
          'Multi-valued attributes',
          'Partial functional dependencies on a composite primary key',
          'Transitive functional dependencies',
          'Candidate keys'
        ],
        correctAnswer: 1,
        explanation: '2NF eliminates partial dependencies, meaning every non-prime attribute must depend entirely on the primary key.'
      },
      {
        id: 203,
        question: 'Which normal form is specifically designed to eliminate transitive dependencies (A → B and B → C)?',
        code: null,
        options: [
          '1NF',
          '2NF',
          '3NF',
          '5NF'
        ],
        correctAnswer: 2,
        explanation: '3NF requires that no non-prime attribute is transitively dependent on the primary key.'
      },
      {
        id: 204,
        question: 'Boyce-Codd Normal Form (BCNF) is a stricter version of which normal form?',
        code: null,
        options: [
          '1NF',
          '2NF',
          '3NF',
          '4NF'
        ],
        correctAnswer: 2,
        explanation: 'BCNF is a stricter form of 3NF where for every functional dependency X → Y, X must be a super key.'
      },
      {
        id: 205,
        question: 'What is insertion anomaly in an unnormalized database table?',
        code: null,
        options: [
          'Inability to insert data without adding dummy values for unrelated fields',
          'Loss of data when deleting a record',
          'Inconsistent duplicate entries across rows',
          'Index fragmentation'
        ],
        correctAnswer: 0,
        explanation: 'An insertion anomaly occurs when you cannot insert data into a table without simultaneously adding incomplete or dummy data for other fields.'
      }
    ]
  },
  java: {
    'Exception Handling': [
      {
        id: 301,
        question: 'Which block in Java exception handling ALWAYS executes whether an exception occurs or not?',
        code: null,
        options: [
          'try',
          'catch',
          'finally',
          'throws'
        ],
        correctAnswer: 2,
        explanation: 'The finally block is guaranteed to run after try/catch blocks, useful for resource cleanup.'
      },
      {
        id: 302,
        question: 'Which of the following is a checked exception in Java?',
        code: null,
        options: [
          'NullPointerException',
          'ArithmeticException',
          'IOException',
          'ArrayIndexOutOfBoundsException'
        ],
        correctAnswer: 2,
        explanation: 'IOException is a checked exception that must be declared in a throws clause or handled in a try-catch block at compile time.'
      }
    ]
  },
  dsa: {
    'Binary Search Trees': [
      {
        id: 401,
        question: 'What is the average time complexity for searching an element in a balanced Binary Search Tree (BST)?',
        code: null,
        options: [
          'O(1)',
          'O(log N)',
          'O(N)',
          'O(N log N)'
        ],
        correctAnswer: 1,
        explanation: 'In a balanced BST, searching halves the remaining tree at each step, resulting in O(log N) average time complexity.'
      }
    ]
  },
  cn: {
    'TCP/IP Handshake & Protocols': [
      {
        id: 501,
        question: 'What is the correct 3-step packet sequence for establishing a TCP connection?',
        code: null,
        options: [
          'ACK, SYN, SYN-ACK',
          'SYN, SYN-ACK, ACK',
          'PING, PONG, ACK',
          'CONNECT, ACCEPT, CONFIRM'
        ],
        correctAnswer: 1,
        explanation: 'The 3-way TCP handshake consists of SYN (Synchronize), SYN-ACK (Synchronize-Acknowledge), and ACK (Acknowledge).'
      }
    ]
  }
};
