import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { 
  Trophy, Code, Crown, Flame, Star, Award, CheckCircle2, 
  Play, Volume2, VolumeX, ChevronRight, Sparkles, PartyPopper, ArrowRight, Home
} from "lucide-react";

// Types
interface UserProgress {
  username: string;
  level: number;
  xp: number;
  streak: number;
  completedLessons: number[];
  badges: string[];
  lastVisit: string;
}

interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  concept: string;
  analogy: string;
  explanation: string;
  challenge: string;
  starterCode: string;
  solution: string;
  hint: string;
}

// Lesson Data
const lessons: Lesson[] = [
  {
    id: 1,
    title: "The King is main()",
    subtitle: "The Foundation of Every Game",
    concept: "int main() function",
    analogy: "The King is the most crucial piece. Everything revolves around protecting and positioning the King. Similarly, main() is where your C program begins and ends.",
    explanation: "Just as a chess game cannot exist without the King, a C program cannot run without the main() function. It's the entry point where execution begins.",
    challenge: "Write the main function to place the White King on its starting square (e1).",
    starterCode: "// Write your main function here\n// Place the King at position e1\n\n",
    solution: "#include <stdio.h>\n\nint main() {\n    printf(\"King placed at e1\\n\");\n    return 0;\n}",
    hint: "Remember: int main() { ... return 0; }"
  },
  {
    id: 2,
    title: "The Pawns are Variables",
    subtitle: "Your Basic Building Blocks",
    concept: "Variables & Data Types",
    analogy: "Pawns are the most basic units in chess. Each pawn has a file (a-h) and rank (1-8), just like variables have a type and value.",
    explanation: "A variable is like a pawn with a name (identifier) and a value (its position). An 'int' is a pawn that can hold whole numbers, like rank numbers 1-8.",
    challenge: "Declare an integer variable pawn_e_rank and assign it the value 2 to place the pawn on e2.",
    starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare a variable for the e-pawn's rank\n    \n    printf(\"E-pawn is on rank %d\\n\", pawn_e_rank);\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    int pawn_e_rank = 2;\n    printf(\"E-pawn is on rank %d\\n\", pawn_e_rank);\n    return 0;\n}",
    hint: "Syntax: int variable_name = value;"
  },
  {
    id: 3,
    title: "The Board is Your Memory",
    subtitle: "Eight Files, Eight Variables",
    concept: "Multiple Variables",
    analogy: "A chess board has 8 files (a-h). We can represent all 8 white pawns using 8 different variables.",
    explanation: "Just as chess has 8 pawns, we can create 8 variables to track each one. This teaches us about organizing data in memory.",
    challenge: "Create 8 pawn variables and place them on their starting ranks (rank 2).",
    starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare 8 variables for pawns a-h\n    \n    printf(\"All pawns placed on rank 2\\n\");\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    int pawn_a = 2, pawn_b = 2, pawn_c = 2, pawn_d = 2;\n    int pawn_e = 2, pawn_f = 2, pawn_g = 2, pawn_h = 2;\n    printf(\"All pawns placed on rank 2\\n\");\n    return 0;\n}",
    hint: "You can declare multiple variables in one line: int a = 2, b = 2;"
  },
  {
    id: 4,
    title: "Making Moves with Operators",
    subtitle: "Advancing Your Position",
    concept: "Operators (+, -, =)",
    analogy: "Moving a piece is like using operators. 'pawn_e = pawn_e + 2' moves the e-pawn forward 2 squares.",
    explanation: "Operators let us manipulate values. The = operator assigns, + adds, - subtracts. Just like moving pieces on a board!",
    challenge: "Write code to advance the e-pawn two squares on its first move (from rank 2 to rank 4).",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int pawn_e_rank = 2;\n    printf(\"E-pawn starts at rank %d\\n\", pawn_e_rank);\n    \n    // Move the pawn forward 2 squares\n    \n    printf(\"E-pawn is now at rank %d\\n\", pawn_e_rank);\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    int pawn_e_rank = 2;\n    printf(\"E-pawn starts at rank %d\\n\", pawn_e_rank);\n    \n    pawn_e_rank = pawn_e_rank + 2;\n    \n    printf(\"E-pawn is now at rank %d\\n\", pawn_e_rank);\n    return 0;\n}",
    hint: "Use the + operator: pawn_e_rank = pawn_e_rank + 2;"
  },
  {
    id: 5,
    title: "Forks & Decisions with if-else",
    subtitle: "Strategic Choices",
    concept: "Conditional Statements (if-else)",
    analogy: "A fork is when a knight attacks two pieces. You must decide which to save. if-else creates decision trees in code.",
    explanation: "Just like choosing which piece to move when under attack, if-else lets your program make decisions based on conditions.",
    challenge: "A knight is attacking your Queen (value 9) and Rook (value 5). Write an if-else to save the more valuable piece.",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int queen_value = 9;\n    int rook_value = 5;\n    \n    // Write if-else to save the more valuable piece\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    int queen_value = 9;\n    int rook_value = 5;\n    \n    if (queen_value > rook_value) {\n        printf(\"Save the Queen! (Value: %d)\\n\", queen_value);\n    } else {\n        printf(\"Save the Rook! (Value: %d)\\n\", rook_value);\n    }\n    \n    return 0;\n}",
    hint: "Use if (condition) { } else { }"
  },
  {
    id: 6,
    title: "The Knight's L-Move with Loops",
    subtitle: "Repetitive Patterns",
    concept: "For Loops",
    analogy: "A knight moves in an L-shape: 2 squares in one direction, 1 square perpendicular. To find all 8 possible moves, you repeat this pattern 8 times.",
    explanation: "Loops let you repeat code efficiently. Just like a knight has 8 possible moves, a for loop can iterate 8 times to check each one.",
    challenge: "Write a for loop that prints numbers 1 to 8, representing the 8 possible knight moves.",
    starterCode: "#include <stdio.h>\n\nint main() {\n    // Use a for loop to print 1 to 8\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 8; i++) {\n        printf(\"Knight move %d\\n\", i);\n    }\n    return 0;\n}",
    hint: "for (int i = 1; i <= 8; i++) { ... }"
  },
  {
    id: 7,
    title: "Patrolling Ranks with While",
    subtitle: "Conditional Repetition",
    concept: "While Loops",
    analogy: "A rook on an open file controls all squares from rank 1 to 8. It 'scans' or 'patrols' each square until it finds an enemy piece.",
    explanation: "While loops repeat as long as a condition is true. Like a rook scanning each rank until it reaches the end of the board.",
    challenge: "Use a while loop to move a rook from rank 1 to rank 8.",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int rank = 1;\n    // Use while loop to move rook to rank 8\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    int rank = 1;\n    while (rank <= 8) {\n        printf(\"Rook at rank %d\\n\", rank);\n        rank++;\n    }\n    return 0;\n}",
    hint: "while (rank <= 8) { ... rank++; }"
  },
  {
    id: 8,
    title: "Choosing Pieces with Switch",
    subtitle: "Multiple Choices",
    concept: "Switch Statements",
    analogy: "In chess notation, K=King, Q=Queen, R=Rook, B=Bishop, N=Knight. Based on the letter, we know the piece.",
    explanation: "Switch statements let you handle multiple specific cases efficiently. Like identifying a chess piece from its notation letter.",
    challenge: "Write a switch statement that prints the piece name based on its notation letter.",
    starterCode: "#include <stdio.h>\n\nint main() {\n    char piece = 'Q';\n    // Use switch to identify the piece\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    char piece = 'Q';\n    switch(piece) {\n        case 'K': printf(\"King\\n\"); break;\n        case 'Q': printf(\"Queen\\n\"); break;\n        case 'R': printf(\"Rook\\n\"); break;\n        case 'B': printf(\"Bishop\\n\"); break;\n        case 'N': printf(\"Knight\\n\"); break;\n        default: printf(\"Pawn\\n\");\n    }\n    return 0;\n}",
    hint: "switch(piece) { case 'Q': ...; break; }"
  },
  {
    id: 9,
    title: "Castling with Break",
    subtitle: "Breaking the Flow",
    concept: "Break Statement",
    analogy: "Castling is a special move that breaks the normal flow of the game. Similarly, break exits a loop or switch early.",
    explanation: "The break statement interrupts normal execution flow, just like castling is a special exception to normal piece movement.",
    challenge: "Use a loop to search for the King ('K'). When found, break out of the loop.",
    starterCode: "#include <stdio.h>\n\nint main() {\n    char board[] = {'R','N','B','Q','K','B','N','R'};\n    // Find the King and break\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    char board[] = {'R','N','B','Q','K','B','N','R'};\n    for (int i = 0; i < 8; i++) {\n        if (board[i] == 'K') {\n            printf(\"King found at position %d\\n\", i);\n            break;\n        }\n    }\n    return 0;\n}",
    hint: "Use if inside the loop, then break when you find 'K'"
  },
  {
    id: 10,
    title: "En Passant with Continue",
    subtitle: "Skip and Continue",
    concept: "Continue Statement",
    analogy: "En passant is a special pawn capture that happens under specific conditions. Sometimes you skip certain squares.",
    explanation: "Continue skips the current iteration and moves to the next, like skipping over certain board squares under special conditions.",
    challenge: "Print all ranks except rank 4 (skip it using continue).",
    starterCode: "#include <stdio.h>\n\nint main() {\n    // Print ranks 1-8, skip rank 4\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    for (int rank = 1; rank <= 8; rank++) {\n        if (rank == 4) continue;\n        printf(\"Rank %d\\n\", rank);\n    }\n    return 0;\n}",
    hint: "if (rank == 4) continue; will skip rank 4"
  },
  {
    id: 11,
    title: "Opening Gambits as Functions",
    subtitle: "Reusable Strategies",
    concept: "Functions",
    analogy: "A chess opening like the Queen's Gambit is a named sequence of moves you can 'call' at the start of a game.",
    explanation: "Functions are named blocks of code you can call whenever needed, just like using a chess opening strategy.",
    challenge: "Create a function named queensGambit() that prints 'Playing Queen\\'s Gambit'.",
    starterCode: "#include <stdio.h>\n\n// Define the function\n\n\nint main() {\n    // Call the function\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nvoid queensGambit() {\n    printf(\"Playing Queen's Gambit\\n\");\n}\n\nint main() {\n    queensGambit();\n    return 0;\n}",
    hint: "void functionName() { ... } then call it in main()"
  },
  {
    id: 12,
    title: "Calculating Material with Return",
    subtitle: "Getting Information Back",
    concept: "Return Values",
    analogy: "In chess, you evaluate material by adding piece values. A function can calculate and 'return' this total.",
    explanation: "Functions can send back values using return, like a scout returning with information about enemy positions.",
    challenge: "Create a function that calculates and returns total material (Q=9, R=5, B=3).",
    starterCode: "#include <stdio.h>\n\n// Function to calculate material\n\n\nint main() {\n    int total = // call function\n    printf(\"Total material: %d\\n\", total);\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint calculateMaterial() {\n    int queen = 9, rook = 5, bishop = 3;\n    return queen + rook + bishop;\n}\n\nint main() {\n    int total = calculateMaterial();\n    printf(\"Total material: %d\\n\", total);\n    return 0;\n}",
    hint: "int functionName() { return value; }"
  },
  {
    id: 13,
    title: "Strategic Parameters",
    subtitle: "Passing Information",
    concept: "Function Parameters",
    analogy: "Different pieces need different strategies. You might have a developPiece(piece_type) that takes the piece as input.",
    explanation: "Function parameters let you pass values into functions, like giving specific instructions to move different pieces.",
    challenge: "Create a function movePiece(char piece, int squares) that prints the move.",
    starterCode: "#include <stdio.h>\n\n// Define function with parameters\n\n\nint main() {\n    movePiece('P', 2);\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nvoid movePiece(char piece, int squares) {\n    printf(\"Moving %c forward %d squares\\n\", piece, squares);\n}\n\nint main() {\n    movePiece('P', 2);\n    return 0;\n}",
    hint: "void functionName(type param1, type param2) { ... }"
  },
  {
    id: 14,
    title: "The Back Rank Array",
    subtitle: "Collections of Data",
    concept: "Arrays",
    analogy: "The back rank has 8 pieces in a specific order: RNBQKBNR. An array is a collection stored in consecutive locations.",
    explanation: "Arrays store multiple values of the same type, just like the back rank holds multiple pieces in specific positions.",
    challenge: "Create an array to store the white back rank pieces.",
    starterCode: "#include <stdio.h>\n\nint main() {\n    // Create array for back rank\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    char backRank[8] = {'R','N','B','Q','K','B','N','R'};\n    for(int i = 0; i < 8; i++) {\n        printf(\"%c \", backRank[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
    hint: "type arrayName[size] = {values}; Access with arrayName[index]"
  },
  {
    id: 15,
    title: "Coordinates with 2D Arrays",
    subtitle: "The Complete Board",
    concept: "2D Arrays",
    analogy: "A chessboard is 8x8 - 8 files and 8 ranks. A 2D array perfectly represents this grid structure.",
    explanation: "2D arrays create grids of data, where board[rank][file] gives you the piece at that square, just like a chessboard.",
    challenge: "Create an 8x8 character array to represent a chessboard.",
    starterCode: "#include <stdio.h>\n\nint main() {\n    // Create 8x8 board\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    char board[8][8];\n    for(int i = 0; i < 8; i++) {\n        for(int j = 0; j < 8; j++) {\n            board[i][j] = ' ';\n        }\n    }\n    board[0][4] = 'K';\n    printf(\"Board initialized with King\\n\");\n    return 0;\n}",
    hint: "type array[rows][cols]; Use nested loops to iterate"
  },
  {
    id: 16,
    title: "Piece Notation Strings",
    subtitle: "Text and Characters",
    concept: "Strings",
    analogy: "Chess moves are written as strings: 'e4', 'Nf3', 'O-O'. Strings let us store and manipulate text.",
    explanation: "In C, strings are arrays of characters ending with null terminator '\\0'. They represent sequences like chess notation.",
    challenge: "Create a string to store a chess move like 'e4' and print it.",
    starterCode: "#include <stdio.h>\n\nint main() {\n    // Create a string for move 'e4'\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    char move[] = \"e4\";\n    printf(\"Move: %s\\n\", move);\n    printf(\"File: %c, Rank: %c\\n\", move[0], move[1]);\n    return 0;\n}",
    hint: "char name[] = \"text\"; Use %s to print strings"
  },
  {
    id: 17,
    title: "File Pointers & Addresses",
    subtitle: "Memory Control",
    concept: "Pointers Introduction",
    analogy: "A rook on an open file 'points to' and controls every square on that file. Pointers 'point to' memory addresses.",
    explanation: "Pointers hold memory addresses, controlling access to values stored there, like a rook controlling an entire file.",
    challenge: "Create a pointer to an integer variable representing a rook's file.",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int rook_file = 1;  // 'a' file\n    // Create a pointer to rook_file\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    int rook_file = 1;\n    int *ptr = &rook_file;\n    printf(\"Rook on file %d\\n\", *ptr);\n    printf(\"Address: %p\\n\", (void*)ptr);\n    return 0;\n}",
    hint: "int *ptr = &variable; Use & for address, * to get value"
  },
  {
    id: 18,
    title: "Coordinated Battery Structure",
    subtitle: "Grouping Related Data",
    concept: "Structures",
    analogy: "A battery is when pieces work together on the same file. A struct groups related variables into one unit.",
    explanation: "Structures combine different data types, like combining piece type, file, and rank to represent a complete chess piece.",
    challenge: "Create a structure to represent a chess piece with type, file, and rank.",
    starterCode: "#include <stdio.h>\n\n// Define the structure\n\n\nint main() {\n    // Create a piece\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nstruct Piece {\n    char type;\n    char file;\n    int rank;\n};\n\nint main() {\n    struct Piece queen = {'Q', 'd', 1};\n    printf(\"%c on %c%d\\n\", queen.type, queen.file, queen.rank);\n    return 0;\n}",
    hint: "struct Name { members; }; Access with dot (.)"
  },
  {
    id: 19,
    title: "Saving Games with Files",
    subtitle: "Data Persistence",
    concept: "File Handling",
    analogy: "Chess games are saved in PGN files for later analysis. File handling lets you save program data permanently.",
    explanation: "File operations (fopen, fprintf, fclose) let you save data to files and load it later, like saving a chess game in PGN format.",
    challenge: "Write a move to a file named 'game.pgn'.",
    starterCode: "#include <stdio.h>\n\nint main() {\n    // Open file, write move, close file\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen(\"game.pgn\", \"w\");\n    if(fp != NULL) {\n        fprintf(fp, \"1. e4 e5\\n\");\n        fclose(fp);\n        printf(\"Game saved!\\n\");\n    }\n    return 0;\n}",
    hint: "FILE *fp = fopen(name, mode); Check if fp != NULL"
  },
  {
    id: 20,
    title: "Dynamic Memory with malloc()",
    subtitle: "Allocating Space Dynamically",
    concept: "Dynamic Memory Allocation",
    analogy: "Sometimes you don't know how many pieces you'll analyze until the game starts. malloc() lets you request memory at runtime.",
    explanation: "malloc() allocates memory dynamically on the heap, allowing flexible data structures that can grow or shrink as needed.",
    challenge: "Dynamically allocate an array of 8 integers for pawn positions.",
    starterCode: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // Allocate memory for 8 pawns\n    \n    // Don't forget to free!\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *pawns = (int*)malloc(8 * sizeof(int));\n    if(pawns != NULL) {\n        for(int i = 0; i < 8; i++) {\n            pawns[i] = 2;\n            printf(\"Pawn %d at rank %d\\n\", i+1, pawns[i]);\n        }\n        free(pawns);\n    }\n    return 0;\n}",
    hint: "type *ptr = (type*)malloc(size * sizeof(type)); free(ptr);"
  },
  {
    id: 21,
    title: "Piece Types with Enum",
    subtitle: "Named Constants",
    concept: "Enumerations",
    analogy: "Chess pieces have distinct types: Pawn, Knight, Bishop, Rook, Queen, King. Enums let you define these as named constants.",
    explanation: "Enums create a set of named integer constants, making code more readable than using raw numbers for piece types.",
    challenge: "Create an enum for piece types and use it to declare a Queen.",
    starterCode: "#include <stdio.h>\n\n// Define enum PieceType\n\n\nint main() {\n    // Create a variable of type PieceType\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nenum PieceType {\n    PAWN,\n    KNIGHT,\n    BISHOP,\n    ROOK,\n    QUEEN,\n    KING\n};\n\nint main() {\n    enum PieceType myPiece = QUEEN;\n    printf(\"Piece type: %d (Queen)\\n\", myPiece);\n    return 0;\n}",
    hint: "enum Name { VALUE1, VALUE2, ... }; Values start at 0"
  },
  {
    id: 22,
    title: "Custom Types with typedef",
    subtitle: "Simplifying Declarations",
    concept: "Type Definitions",
    analogy: "Instead of writing 'struct Piece' everywhere, you can use typedef to create a shorthand like 'ChessPiece'.",
    explanation: "typedef creates aliases for existing types, making code cleaner and easier to read.",
    challenge: "Use typedef to create a Position type for coordinates, then declare a queen's position.",
    starterCode: "#include <stdio.h>\n\nstruct Coordinate {\n    char file;\n    int rank;\n};\n\n// Use typedef to create Position alias\n\n\nint main() {\n    // Declare a Position variable\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nstruct Coordinate {\n    char file;\n    int rank;\n};\n\ntypedef struct Coordinate Position;\n\nint main() {\n    Position queenPos = {'d', 1};\n    printf(\"Queen at %c%d\\n\", queenPos.file, queenPos.rank);\n    return 0;\n}",
    hint: "typedef existingType NewName;"
  },
  {
    id: 23,
    title: "Calculating Moves with Recursion",
    subtitle: "Functions Calling Themselves",
    concept: "Recursion",
    analogy: "Chess engines calculate moves by exploring each possible move, then each response, then each counter-response... This self-similar process is recursion.",
    explanation: "Recursion is when a function calls itself. It's perfect for tree-like problems like calculating possible chess moves.",
    challenge: "Write a recursive function to calculate factorial (useful for counting move combinations).",
    starterCode: "#include <stdio.h>\n\n// Write recursive factorial function\n\n\nint main() {\n    int result = factorial(5);\n    printf(\"5! = %d\\n\", result);\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    int result = factorial(5);\n    printf(\"5! = %d\\n\", result);\n    printf(\"Combinations calculated!\\n\");\n    return 0;\n}",
    hint: "Base case: if (n <= 1) return 1; Recursive: return n * factorial(n-1);"
  },
  {
    id: 24,
    title: "Board Constants with #define",
    subtitle: "Preprocessor Magic",
    concept: "Preprocessor Directives",
    analogy: "A chessboard is always 8x8. We can use #define to create a constant that never changes.",
    explanation: "The preprocessor runs before compilation, replacing #define constants with their values throughout your code.",
    challenge: "Use #define to create board size constants and initialize a board array.",
    starterCode: "#include <stdio.h>\n\n// Define BOARD_SIZE as 8\n\n\nint main() {\n    char board[BOARD_SIZE][BOARD_SIZE];\n    printf(\"Board size: %dx%d\\n\", BOARD_SIZE, BOARD_SIZE);\n    return 0;\n}",
    solution: "#include <stdio.h>\n\n#define BOARD_SIZE 8\n#define EMPTY_SQUARE '.'\n\nint main() {\n    char board[BOARD_SIZE][BOARD_SIZE];\n    for(int i = 0; i < BOARD_SIZE; i++) {\n        for(int j = 0; j < BOARD_SIZE; j++) {\n            board[i][j] = EMPTY_SQUARE;\n        }\n    }\n    printf(\"Board size: %dx%d\\n\", BOARD_SIZE, BOARD_SIZE);\n    printf(\"Board initialized with empty squares\\n\");\n    return 0;\n}",
    hint: "#define NAME value (no semicolon needed)"
  },
  {
    id: 25,
    title: "Grandmaster Challenge",
    subtitle: "Complete Integration",
    concept: "Putting It All Together",
    analogy: "You've learned all the pieces and rules. Now combine everything to simulate a complete chess program!",
    explanation: "This final challenge combines functions, arrays, structs, and file handling - all the concepts you've mastered on your journey.",
    challenge: "Create a mini chess program that initializes a board, makes a move, and saves it.",
    starterCode: "#include <stdio.h>\n\nstruct Piece {\n    char type;\n    int file, rank;\n};\n\n// Your code here\n\nint main() {\n    \n    return 0;\n}",
    solution: "#include <stdio.h>\n\nstruct Piece {\n    char type;\n    int file, rank;\n};\n\nvoid movePiece(struct Piece *p, int newFile, int newRank) {\n    p->file = newFile;\n    p->rank = newRank;\n}\n\nint main() {\n    struct Piece pawn = {'P', 4, 2};\n    printf(\"Initial: %c at %d,%d\\n\", pawn.type, pawn.file, pawn.rank);\n    \n    movePiece(&pawn, 4, 4);\n    printf(\"After move: %c at %d,%d\\n\", pawn.type, pawn.file, pawn.rank);\n    \n    FILE *fp = fopen(\"game.pgn\", \"w\");\n    if(fp) {\n        fprintf(fp, \"e2-e4\\n\");\n        fclose(fp);\n    }\n    \n    return 0;\n}",
    hint: "Combine everything: struct, pointers, functions, files"
  }
];

// Badge definitions
const allBadges = [
  { id: "first-move", name: "First Move", icon: "🏁", requirement: "Complete first lesson" },
  { id: "pawn-master", name: "Pawn Master", icon: "♟️", requirement: "Master variables" },
  { id: "strategic-mind", name: "Strategic Mind", icon: "🧠", requirement: "Complete 3 lessons" },
  { id: "code-warrior", name: "Code Warrior", icon: "⚔️", requirement: "Complete 5 lessons" },
  { id: "streak-3", name: "3-Day Streak", icon: "🔥", requirement: "3 consecutive days" },
];

const Index = () => {
  // State declarations
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<"dashboard" | "lesson" | "badges">("dashboard");
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [userCode, setUserCode] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [chessboardAnimate, setChessboardAnimate] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  
  // Audio setup - Using useRef to persist audio instances without causing re-renders
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const successSoundRef = useRef<HTMLAudioElement | null>(null);
  const errorSoundRef = useRef<HTMLAudioElement | null>(null);
  const moveSoundRef = useRef<HTMLAudioElement | null>(null);
  const levelUpSoundRef = useRef<HTMLAudioElement | null>(null);
  
  const [progress, setProgress] = useState<UserProgress>({
    username: "Knight Errant",
    level: 1,
    xp: 0,
    streak: 0,
    completedLessons: [],
    badges: [],
    lastVisit: new Date().toISOString().split('T')[0]
  });

  // Initialize audio refs once on mount
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_17b17ca3b2.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      audioRef.current.onerror = () => console.error('Failed to load background music');
      audioRef.current.onloadeddata = () => console.log('Background music loaded successfully');
    }
    
    if (!successSoundRef.current) {
      successSoundRef.current = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_c610232c26.mp3');
      successSoundRef.current.volume = 0.5;
      successSoundRef.current.onerror = () => console.error('Failed to load success sound');
    }
    
    if (!errorSoundRef.current) {
      errorSoundRef.current = new Audio('https://cdn.pixabay.com/audio/2022/03/24/audio_a87fb85a27.mp3');
      errorSoundRef.current.volume = 0.4;
      errorSoundRef.current.onerror = () => console.error('Failed to load error sound');
    }
    
    if (!moveSoundRef.current) {
      moveSoundRef.current = new Audio('https://cdn.pixabay.com/audio/2023/11/16/audio_c1e94b8727.mp3');
      moveSoundRef.current.volume = 0.3;
      moveSoundRef.current.onerror = () => console.error('Failed to load move sound');
    }
    
    if (!levelUpSoundRef.current) {
      levelUpSoundRef.current = new Audio('https://cdn.pixabay.com/audio/2022/08/02/audio_884fe25c21.mp3');
      levelUpSoundRef.current.volume = 0.6;
      levelUpSoundRef.current.onerror = () => console.error('Failed to load level up sound');
    }
  }, []);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("codequest-progress");
    if (saved) {
      const loaded = JSON.parse(saved);
      setProgress(loaded);
      
      // Check streak
      const today = new Date().toISOString().split('T')[0];
      const lastVisit = new Date(loaded.lastVisit);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (loaded.lastVisit === today) {
        // Same day, keep streak
      } else if (loaded.lastVisit === yesterday.toISOString().split('T')[0]) {
        // Consecutive day, increment streak
        setProgress(prev => ({ ...prev, streak: prev.streak + 1, lastVisit: today }));
      } else {
        // Streak broken
        setProgress(prev => ({ ...prev, streak: 1, lastVisit: today }));
      }
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem("codequest-progress", JSON.stringify(progress));
  }, [progress]);

  // Handle music - improved implementation with user interaction
  useEffect(() => {
    if (!audioInitialized) return;
    
    const playAudio = async () => {
      try {
        if (!isMuted && audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.volume = 0.3;
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => console.log("Music started"))
              .catch(error => console.log("Audio autoplay prevented:", error));
          }
        } else if (audioRef.current) {
          audioRef.current.pause();
        }
      } catch (error) {
        console.log("Audio error:", error);
      }
    };
    
    playAudio();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isMuted, audioInitialized]);

  const getLevelName = (level: number) => {
    if (level < 5) return "Pawn";
    if (level < 10) return "Knight";
    if (level < 15) return "Bishop";
    if (level < 20) return "Rook";
    if (level < 25) return "Queen";
    return "Grandmaster";
  };

  const startLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setUserCode(lesson.starterCode);
    setShowHint(false);
    setCurrentScreen("lesson");
    
    // Play move sound when starting lesson
    if (!isMuted && moveSoundRef.current) {
      moveSoundRef.current.play().catch(() => {});
    }
  };

  const runCode = () => {
    if (!currentLesson) return;
    
    // Simple validation - check if code contains key elements
    const codeCheck = userCode.toLowerCase();
    let isCorrect = false;
    
    switch (currentLesson.id) {
      case 1:
        isCorrect = codeCheck.includes("int main") && codeCheck.includes("return 0");
        break;
      case 2:
        isCorrect = codeCheck.includes("int pawn_e_rank") && codeCheck.includes("= 2");
        break;
      case 3:
        isCorrect = codeCheck.includes("pawn_a") && codeCheck.includes("pawn_h");
        break;
      case 4:
        isCorrect = codeCheck.includes("pawn_e_rank + 2") || codeCheck.includes("pawn_e_rank += 2");
        break;
      case 5:
        isCorrect = codeCheck.includes("if") && codeCheck.includes("queen_value > rook_value");
        break;
      case 6:
        isCorrect = codeCheck.includes("for") && codeCheck.includes("i <= 8");
        break;
      case 7:
        isCorrect = codeCheck.includes("while") && codeCheck.includes("rank");
        break;
      case 8:
        isCorrect = codeCheck.includes("switch") && codeCheck.includes("case");
        break;
      case 9:
        isCorrect = codeCheck.includes("break") && codeCheck.includes("for");
        break;
      case 10:
        isCorrect = codeCheck.includes("continue") && codeCheck.includes("for");
        break;
      case 11:
        isCorrect = codeCheck.includes("void") && codeCheck.includes("queensgambit");
        break;
      case 12:
        isCorrect = codeCheck.includes("int") && codeCheck.includes("return") && codeCheck.includes("calculatematerial");
        break;
      case 13:
        isCorrect = codeCheck.includes("void movepiece") && codeCheck.includes("char piece");
        break;
      case 14:
        isCorrect = codeCheck.includes("char") && codeCheck.includes("[8]") && codeCheck.includes("backrank");
        break;
      case 15:
        isCorrect = codeCheck.includes("board[8][8]");
        break;
      case 16:
        isCorrect = codeCheck.includes("char move[]") && codeCheck.includes("\"e4\"");
        break;
      case 17:
        isCorrect = codeCheck.includes("int *ptr") && codeCheck.includes("&");
        break;
      case 18:
        isCorrect = codeCheck.includes("struct piece") && codeCheck.includes("char type");
        break;
      case 19:
        isCorrect = codeCheck.includes("file *") && codeCheck.includes("fopen");
        break;
      case 20:
        isCorrect = codeCheck.includes("struct piece") && codeCheck.includes("fopen") && codeCheck.includes("movepiece");
        break;
      default:
        isCorrect = false;
    }
    
    if (isCorrect) {
      // Trigger chessboard animation FIRST
      setChessboardAnimate(true);
      
      // Play success sound
      if (!isMuted && successSoundRef.current) {
        successSoundRef.current.play().catch(() => {});
      }
      
      toast({
        title: "Perfect! ✨",
        description: "You've solved the puzzle!",
      });
      
      // Show success modal AFTER animation (2 seconds delay)
      setTimeout(() => {
        setChessboardAnimate(false);
        setShowSuccessModal(true);
      }, 2000);
      
      // Update progress if first time completing
      if (!progress.completedLessons.includes(currentLesson.id)) {
        const newCompleted = [...progress.completedLessons, currentLesson.id].sort((a, b) => a - b);
        const newXP = progress.xp + 100;
        const oldLevel = progress.level;
        const newLevel = Math.floor(newXP / 500) + 1;
        const newBadges = [...progress.badges];
        
        // Play level up sound if leveled up
        if (newLevel > oldLevel && !isMuted && levelUpSoundRef.current) {
          setTimeout(() => levelUpSoundRef.current!.play().catch(() => {}), 500);
        }
        
        // Award badges
        if (currentLesson.id === 1 && !newBadges.includes("first-move")) {
          newBadges.push("first-move");
          toast({ title: "🏆 Badge Unlocked!", description: "First Move" });
        }
        if (currentLesson.id === 2 && !newBadges.includes("pawn-master")) {
          newBadges.push("pawn-master");
          toast({ title: "🏆 Badge Unlocked!", description: "Pawn Master" });
        }
        if (newCompleted.length >= 3 && !newBadges.includes("strategic-mind")) {
          newBadges.push("strategic-mind");
          toast({ title: "🏆 Badge Unlocked!", description: "Strategic Mind" });
        }
        if (newCompleted.length >= 5 && !newBadges.includes("code-warrior")) {
          newBadges.push("code-warrior");
          toast({ title: "🏆 Badge Unlocked!", description: "Code Warrior" });
        }
        
        setProgress(prev => ({
          ...prev,
          xp: newXP,
          level: newLevel,
          completedLessons: newCompleted,
          badges: newBadges
        }));
      }
    } else {
      // Play error sound
      if (!isMuted && errorSoundRef.current) {
        errorSoundRef.current.play().catch(() => {});
      }
      
      toast({
        title: "Not quite right",
        description: "Try again or use the hint!",
        variant: "destructive"
      });
    }
  };

  const showSolution = () => {
    if (currentLesson) {
      setUserCode(currentLesson.solution);
      toast({
        title: "Solution Revealed",
        description: "Study the code carefully!",
      });
    }
  };

  // Splash Screen
  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-background to-card flex items-center justify-center z-50 animate-fade-in">
        <div className="text-center space-y-6 sm:space-y-8 px-4">
           <div className="text-6xl sm:text-8xl bounce-in">
            <span className="inline-block float">♞</span>
            <span className="text-primary ml-4 font-mono bounce-in" style={{ animationDelay: "0.3s" }}>{"}"}</span>
          </div>
           <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gradient-animate float">
            LJCCA CodeQuest
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground italic px-4">
            Master C Programming Through the Ancient Game of Kings
          </p>
          <div className="space-y-2 text-muted-foreground animate-fade-in text-xs sm:text-sm">
            <p>Designed & Developed by: <span className="text-primary">Parth D. Joshi</span></p>
            <p className="text-[10px] sm:text-xs">(Assistant Professor)</p>
            <p className="mt-3 sm:mt-4">Innovative Idea by: <span className="text-secondary">Dr. Manish Shah</span></p>
            <p className="text-[10px] sm:text-xs">(President, LJK)</p>
          </div>
          <Button
            onClick={() => {
              setShowSplash(false);
              setAudioInitialized(true);
              setIsMuted(false); // Unmute when user clicks
              // Play move sound on start
              if (moveSoundRef.current) {
                moveSoundRef.current.play().catch(() => {});
              }
            }}
            size="lg"
            className="mt-6 sm:mt-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-pulse"
          >
            <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Begin Your Quest
          </Button>
        </div>
      </div>
    );
  }

  // Dashboard
  if (currentScreen === "dashboard") {
    return (
      <div className="min-h-screen p-3 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-2 sm:gap-3">
                <Crown className="text-primary w-8 h-8 sm:w-10 sm:h-10" />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  CodeQuest
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Master C through the Royal Game</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newMutedState = !isMuted;
                setIsMuted(newMutedState);
                if (!newMutedState && audioInitialized && audioRef.current) {
                  audioRef.current.play().catch(e => console.log("Audio toggle failed:", e));
                }
              }}
              className="rounded-full"
              title={isMuted ? "Unmute music" : "Mute music"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* User Profile Card */}
          <Card className="border-primary/20 shadow-lg hover-lift slide-up">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl flex flex-wrap items-center gap-2">
                    <span className="truncate">{progress.username}</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary text-xs whitespace-nowrap">
                      Lv {progress.level} {getLevelName(progress.level)}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <Flame className="text-orange-500 w-4 h-4 sm:w-5 sm:h-5 streak-fire" />
                      {progress.streak} day streak
                    </span>
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      {progress.completedLessons.length} / {lessons.length} lessons
                    </span>
                  </CardDescription>
                </div>
                <Button onClick={() => setCurrentScreen("badges")} variant="outline" size="sm" className="w-full sm:w-auto">
                  <Trophy className="mr-1 sm:mr-2 w-4 h-4" />
                  <span className="text-xs sm:text-sm">Badges ({progress.badges.length})</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>XP Progress</span>
                  <span className="text-primary font-semibold">
                    {progress.xp} / {(progress.level) * 500} XP
                  </span>
                </div>
                <Progress 
                  value={(progress.xp % 500) / 5} 
                  className="h-2 sm:h-3"
                />
              </div>
            </CardContent>
          </Card>

          {/* The Grandmaster's Path */}
          <Card className="slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                <Sparkles className="text-secondary w-5 h-5 sm:w-6 sm:h-6" />
                The Grandmaster's Path
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Your journey from Pawn to Grandmaster</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {lessons.map((lesson) => {
                  const isCompleted = progress.completedLessons.includes(lesson.id);
                  const isLocked = lesson.id > 1 && !progress.completedLessons.includes(lesson.id - 1);
                  
                  return (
                     <Card
                      key={lesson.id}
                      className={`cursor-pointer transition-all duration-300 hover-lift ${
                        isCompleted 
                          ? "border-success bg-success/5 hover:shadow-lg hover:shadow-success/20 slide-up" 
                          : isLocked
                          ? "opacity-50 cursor-not-allowed"
                          : "border-secondary/30 pulse-glow hover:shadow-lg hover:shadow-secondary/20 slide-up"
                      }`}
                      style={{ animationDelay: `${lesson.id * 0.05}s` }}
                      onClick={() => !isLocked && startLesson(lesson)}
                    >
                      <CardHeader className="p-3 sm:p-4 lg:p-6">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 sm:gap-2 mb-1">
                              <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 whitespace-nowrap">
                                Lesson {lesson.id}
                              </Badge>
                              {isCompleted && <CheckCircle2 className="text-success w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />}
                            </div>
                            <CardTitle className="text-sm sm:text-base lg:text-lg truncate">{lesson.title}</CardTitle>
                            <CardDescription className="text-xs sm:text-sm mt-1 line-clamp-2">
                              {lesson.subtitle}
                            </CardDescription>
                          </div>
                          {!isLocked && (
                            <ChevronRight className={`${isCompleted ? "text-success" : "text-secondary"} w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0`} />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
                        <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                          <Code className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{lesson.concept}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-[10px] sm:text-xs lg:text-sm text-muted-foreground border-t border-border pt-4 pb-2 space-y-1">
            <p>Designed & Developed by: <span className="text-primary font-medium">Parth D. Joshi</span> (Assistant Professor)</p>
            <p>Innovative Idea by: <span className="text-secondary font-medium">Dr. Manish Shah</span> (President, LJK)</p>
          </div>
        </div>
      </div>
    );
  }

  // Badges Screen
  if (currentScreen === "badges") {
    return (
      <div className="min-h-screen p-3 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button variant="outline" size="sm" onClick={() => setCurrentScreen("dashboard")}>
              ← Back
            </Button>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-2 sm:gap-3">
              <Trophy className="text-primary w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
              The Armory
            </h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {allBadges.map((badge) => {
              const earned = progress.badges.includes(badge.id);
              return (
                <Card
                  key={badge.id}
                  className={`text-center ${
                    earned 
                      ? "border-primary bg-primary/5 shadow-lg" 
                      : "opacity-40 grayscale"
                  }`}
                >
                  <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                    <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">{badge.icon}</div>
                    <h3 className="font-bold text-sm sm:text-base mb-1 sm:mb-2">{badge.name}</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{badge.requirement}</p>
                    {earned && (
                      <Badge className="mt-2 sm:mt-3 text-[10px] sm:text-xs" variant="outline">
                        <Star className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                        Earned
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Button variant="outline" onClick={() => setCurrentScreen("dashboard")} className="w-full">
            Return to Path
          </Button>
        </div>
      </div>
    );
  }

  // Lesson Screen
  if (currentScreen === "lesson" && currentLesson) {
    const nextLesson = lessons.find(l => l.id === currentLesson.id + 1);
    const hasNextLesson = !!nextLesson;
    
    return (
      <>
        {/* Success Modal */}
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="sm:max-w-md border-primary/50 bg-gradient-to-br from-card via-card to-primary/10">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="text-6xl bounce-in">
                  <PartyPopper className="w-20 h-20 text-primary animate-pulse" />
                </div>
              </div>
              <DialogTitle className="text-2xl sm:text-3xl text-center text-gradient-animate">
                🎉 Quest Complete! 🎉
              </DialogTitle>
              <DialogDescription className="text-center text-base sm:text-lg pt-2">
                You've mastered <span className="text-primary font-bold">{currentLesson.title}</span>!
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col gap-4 py-4">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">+100 XP</div>
                <div className="text-sm text-muted-foreground">Experience Gained</div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowSuccessModal(false);
                    setCurrentScreen("dashboard");
                    // Play move sound
                    if (!isMuted && moveSoundRef.current) {
                      moveSoundRef.current.play().catch(() => {});
                    }
                  }}
                >
                  <Home className="mr-2 w-4 h-4" />
                  Dashboard
                </Button>
                
                {hasNextLesson && (
                  <Button
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 animate-pulse"
                    onClick={() => {
                    setShowSuccessModal(false);
                    // Play move sound
                    if (!isMuted && moveSoundRef.current) {
                      moveSoundRef.current.play().catch(() => {});
                    }
                    startLesson(nextLesson);
                    }}
                  >
                    Next Quest
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
                
                {!hasNextLesson && (
                  <Button
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    onClick={() => {
                      setShowSuccessModal(false);
                      setCurrentScreen("badges");
                    }}
                  >
                    View Badges
                    <Trophy className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="min-h-screen p-2 sm:p-4 lg:p-6">
        <div className="max-w-[1800px] mx-auto space-y-2 sm:space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentScreen("dashboard")} className="text-xs sm:text-sm">
              ← Back
            </Button>
            <Badge variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 py-1">
              Lesson {currentLesson.id}: {currentLesson.title}
            </Badge>
          </div>

          {/* Dual Pane */}
          <div className="grid lg:grid-cols-2 gap-2 sm:gap-4 h-[calc(100vh-80px)] sm:h-[calc(100vh-120px)]">
            {/* Left Pane - The Codex */}
            <Card className="flex flex-col overflow-hidden">
              <CardHeader className="p-3 sm:p-4 lg:p-6 pb-2 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
                  <Code className="text-secondary w-4 h-4 sm:w-5 sm:h-5" />
                  The Codex
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col space-y-2 sm:space-y-4 overflow-auto p-3 sm:p-4 lg:p-6 pt-0">
                {/* Learn Tab */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-2 sm:p-3 lg:p-4">
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 text-secondary">♟️ Chess Analogy</h3>
                    <p className="text-xs sm:text-sm leading-relaxed">{currentLesson.analogy}</p>
                  </div>
                  
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-2 sm:p-3 lg:p-4">
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 text-primary">💻 C Concept</h3>
                    <p className="text-xs sm:text-sm leading-relaxed">{currentLesson.explanation}</p>
                  </div>
                </div>

                {/* Challenge */}
                <div className="bg-card border-2 border-accent rounded-lg p-2 sm:p-3 lg:p-4">
                  <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-2 flex items-center gap-2">
                    <Award className="text-accent w-4 h-4 sm:w-5 sm:h-5" />
                    Your Challenge
                  </h3>
                  <p className="text-xs sm:text-sm mb-3 sm:mb-4">{currentLesson.challenge}</p>
                  
                  {/* Code Editor */}
                  <div className="space-y-2">
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-40 sm:h-52 lg:h-64 code-editor resize-none focus:ring-2 focus:ring-primary outline-none text-xs sm:text-sm"
                      spellCheck={false}
                    />
                    
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <Button onClick={runCode} className="flex-1 min-w-[120px] bg-secondary hover:bg-secondary/80 text-xs sm:text-sm">
                        <Play className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                        Run Code
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowHint(!showHint)}
                        className="text-xs sm:text-sm px-2 sm:px-4"
                      >
                        💡 Hint
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={showSolution}
                        className="text-xs sm:text-sm px-2 sm:px-4"
                      >
                        Solution
                      </Button>
                    </div>

                    {showHint && (
                      <div className="bg-muted/20 border border-muted rounded p-2 sm:p-3 text-xs sm:text-sm">
                        <strong>Hint:</strong> {currentLesson.hint}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Pane - The Chessboard */}
            <Card className="flex flex-col overflow-hidden">
              <CardHeader className="p-3 sm:p-4 lg:p-6 pb-2 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
                  <Crown className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                  The Chessboard
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-auto">
                <div className="w-full max-w-full sm:max-w-[90vw] lg:max-w-[600px] mx-auto">
                  <div className={`grid grid-cols-8 gap-0 border-2 sm:border-4 border-primary rounded-lg overflow-hidden shadow-2xl transition-all duration-500 ${
                    chessboardAnimate ? "animate-scale-in shadow-[0_0_40px_rgba(155,135,245,0.6)]" : ""
                  }`}>
                    {Array.from({ length: 64 }).map((_, i) => {
                      const row = Math.floor(i / 8);
                      const col = i % 8;
                      const isLight = (row + col) % 2 === 0;
                      const rank = 8 - row;
                      const file = String.fromCharCode(97 + col);
                      
                      // Dynamic piece placement based on lesson
                      let piece = "";
                      let shouldHighlight = false;
                      
                      // Lesson 1: King on e1
                      if (currentLesson.id === 1) {
                        if (rank === 1 && file === "e") {
                          piece = "♔";
                          shouldHighlight = chessboardAnimate;
                        }
                      }
                      
                      // Lesson 2: E-pawn on e2
                      if (currentLesson.id === 2) {
                        if (rank === 2 && file === "e") {
                          piece = "♙";
                          shouldHighlight = chessboardAnimate;
                        }
                      }
                      
                      // Lesson 3: All 8 pawns on rank 2
                      if (currentLesson.id === 3) {
                        if (rank === 2) {
                          piece = "♙";
                          shouldHighlight = chessboardAnimate;
                        }
                      }
                      
                      // Lesson 4: E-pawn moves to e4
                      if (currentLesson.id === 4) {
                        if (rank === 4 && file === "e") {
                          piece = "♙";
                          shouldHighlight = chessboardAnimate;
                        }
                        if (rank === 2 && file !== "e") piece = "♙";
                      }
                      
                      // Lesson 5: Queen and Rook fork
                      if (currentLesson.id === 5) {
                        if (rank === 4 && file === "d") piece = "♕";
                        if (rank === 4 && file === "h") piece = "♖";
                        if (rank === 6 && file === "f") {
                          piece = "♞";
                          shouldHighlight = chessboardAnimate;
                        }
                      }
                      
                      // Lesson 6: Knight showing L-moves
                      if (currentLesson.id === 6) {
                        if (rank === 4 && file === "e") {
                          piece = "♞";
                          shouldHighlight = chessboardAnimate;
                        }
                        // Show possible knight move squares
                        const knightMoves = [[6,6],[6,4],[5,7],[5,3],[3,7],[3,3],[2,6],[2,4]];
                        if (chessboardAnimate && knightMoves.some(([r,c]) => r === rank && String.fromCharCode(97+c) === file)) {
                          shouldHighlight = true;
                        }
                      }
                      
                      // Lesson 7: Rook patrolling ranks
                      if (currentLesson.id === 7) {
                        if (file === "a" && rank <= (chessboardAnimate ? 8 : 1)) {
                          piece = "♖";
                          shouldHighlight = chessboardAnimate && rank === 8;
                        }
                        if (file === "a" && !chessboardAnimate && rank === 1) {
                          piece = "♖";
                        }
                      }
                      
                      // Lesson 8: Piece notation
                      if (currentLesson.id === 8) {
                        if (rank === 1) {
                          if (file === "a" || file === "h") piece = "♖";
                          if (file === "b" || file === "g") piece = "♞";
                          if (file === "c" || file === "f") piece = "♗";
                          if (file === "d") piece = "♕";
                          if (file === "e") {
                            piece = "♔";
                            shouldHighlight = chessboardAnimate;
                          }
                        }
                      }
                      
                      // Lesson 9-10: Various board states
                      if (currentLesson.id >= 9 && currentLesson.id <= 10) {
                        if (rank === 1) {
                          if (file === "e") piece = "♔";
                          if (file === "a") piece = "♖";
                        }
                        if (rank === 2 && (file === "f" || file === "g" || file === "h")) piece = "♙";
                      }
                      
                      // Lessons 11-20: Show various piece arrangements
                      if (currentLesson.id >= 11) {
                        if (rank === 1 && file === "e") piece = "♔";
                        if (rank === 1 && file === "d") piece = "♕";
                        if (rank === 2 && file >= "e" && file <= "h") piece = "♙";
                        if (chessboardAnimate && rank === 4 && file === "e") {
                          piece = "♙";
                          shouldHighlight = true;
                        }
                      }
                      
                      return (
                        <div
                          key={i}
                          className={`aspect-square flex items-center justify-center text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition-all duration-300 ${
                            isLight ? "bg-chess-light" : "bg-chess-dark"
                          } ${piece ? "hover:scale-110 cursor-pointer animate-fade-in" : ""} ${
                            shouldHighlight ? "bg-primary/30 animate-pulse ring-2 ring-primary" : ""
                          }`}
                        >
                          <span className={chessboardAnimate && piece ? "animate-scale-in" : ""}>
                            {piece}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Board Labels */}
                  <div className="flex justify-around mt-1 sm:mt-2 text-[10px] sm:text-xs text-muted-foreground font-mono">
                    {["a", "b", "c", "d", "e", "f", "g", "h"].map(f => (
                      <span key={f} className="text-center w-[12.5%]">{f}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </>
    );
  }

  return null;
};

export default Index;
