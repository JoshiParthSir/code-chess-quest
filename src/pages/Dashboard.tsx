import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { 
  Trophy, Code, Crown, Flame, Star, Award, CheckCircle2, 
  Play, Volume2, VolumeX, ChevronRight, Sparkles, PartyPopper, ArrowRight, ArrowLeft, Home, Languages
} from "lucide-react";
import { type Language, getTranslation } from "@/lib/translations";

// Types
interface UserProgress {
  username: string;
  level: number;
  xp: number;
  streak: number;
  completedLessons: number[];
  badges: string[];
  lastVisit: string;
  chessBasicsCompleted?: boolean;
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

interface ChessMove {
  id: number;
  moveName: string;
  description: string;
  steps: string[];
  fromSquare: string;
  toSquare: string;
  pieceType: string;
}

// Lesson Data
const lessons: Lesson[] = [
  {
    id: 1,
    title: "BOOT SEQUENCE: main()",
    subtitle: "Initialize the Neural Core",
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
    title: "DATA NODES: Variables",
    subtitle: "Building Your Digital Arsenal",
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
    title: "MEMORY GRID: The 8x8 Matrix",
    subtitle: "Eight Sectors, Eight Variables",
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
    title: "DATAFLOW: Operators",
    subtitle: "Manipulating the Grid",
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
    title: "DECISION TREE: if-else Protocol",
    subtitle: "Strategic Neural Pathways",
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
    title: "PATTERN SCAN: For Loops",
    subtitle: "Automated Sequences",
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
    title: "SECTOR PATROL: While Loops",
    subtitle: "Conditional Iteration",
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
    title: "SYSTEM SELECTOR: Switch",
    subtitle: "Multi-Path Routing",
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
    title: "EMERGENCY BREAK: Circuit Breaker",
    subtitle: "Interrupt the Flow",
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
    title: "SKIP PROTOCOL: Continue",
    subtitle: "Bypass and Advance",
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
    title: "SUBROUTINES: Functions",
    subtitle: "Reusable Code Modules",
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
    title: "DATA FEEDBACK: Return Values",
    subtitle: "Information Retrieval",
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
    title: "PARAMETER STREAM: Function Args",
    subtitle: "Data Injection",
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
    title: "DATA ARRAY: Sequential Storage",
    subtitle: "Ordered Collections",
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
    title: "THE MATRIX: 2D Arrays",
    subtitle: "Complete Grid System",
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
    title: "TEXT STREAM: Strings",
    subtitle: "Character Sequences",
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
    title: "MEMORY LINK: Pointers",
    subtitle: "Direct Memory Access",
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
    title: "DATA CLUSTER: Structures",
    subtitle: "Grouped Information Units",
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
    title: "PERSISTENCE LAYER: File I/O",
    subtitle: "Data Archive System",
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
    title: "HEAP ALLOCATION: malloc()",
    subtitle: "Dynamic Memory Control",
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
    title: "TYPE CONSTANTS: Enumerations",
    subtitle: "Named Integer Values",
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
    title: "ALIAS PROTOCOL: typedef",
    subtitle: "Type Definitions",
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
    title: "RECURSIVE LOOP: Self-Calling",
    subtitle: "Functions Within Functions",
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
    title: "PREPROCESSOR: #define Macros",
    subtitle: "Compile-Time Constants",
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
    title: "FINAL PROTOCOL: System Integration",
    subtitle: "Complete Neural Synthesis",
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

// Chess moves tutorial - one per lesson
const chessMoves: ChessMove[] = [
  { id: 1, moveName: "Pawn Forward", description: "Pawns move forward one square (or two on their first move)", steps: ["Select the e-pawn", "Move it forward 2 squares to e4"], fromSquare: "e2", toSquare: "e4", pieceType: "pawn" },
  { id: 2, moveName: "Knight's L-Move", description: "Knights move in an L-shape: 2 squares in one direction, 1 perpendicular", steps: ["Select the knight", "Move it to f3 (2 up, 1 right)"], fromSquare: "g1", toSquare: "f3", pieceType: "knight" },
  { id: 3, moveName: "Bishop Diagonal", description: "Bishops move diagonally any number of squares", steps: ["Select the bishop", "Move it diagonally to c4"], fromSquare: "f1", toSquare: "c4", pieceType: "bishop" },
  { id: 4, moveName: "Rook Straight", description: "Rooks move horizontally or vertically any number of squares", steps: ["Select the rook", "Move it forward to e1"], fromSquare: "a1", toSquare: "e1", pieceType: "rook" },
  { id: 5, moveName: "Queen Power", description: "The Queen moves like a rook or bishop combined - any direction", steps: ["Select the queen", "Move it to h5 diagonally"], fromSquare: "d1", toSquare: "h5", pieceType: "queen" },
  { id: 6, moveName: "King's Step", description: "The King moves one square in any direction", steps: ["Select the king", "Move it one square to e2"], fromSquare: "e1", toSquare: "e2", pieceType: "king" },
  { id: 7, moveName: "Pawn Capture", description: "Pawns capture diagonally one square forward", steps: ["Enemy pawn on d5", "Your pawn on e4 captures diagonally"], fromSquare: "e4", toSquare: "d5", pieceType: "pawn" },
  { id: 8, moveName: "Castling", description: "Special move: King moves 2 squares toward rook, rook jumps over", steps: ["King and rook haven't moved", "No pieces between them", "King moves 2 squares, rook jumps over"], fromSquare: "e1", toSquare: "g1", pieceType: "king" },
  { id: 9, moveName: "En Passant", description: "Special pawn capture when enemy pawn moves 2 squares past yours", steps: ["Enemy pawn moves from e7 to e5", "Your pawn on d5 captures it diagonally"], fromSquare: "d5", toSquare: "e6", pieceType: "pawn" },
  { id: 10, moveName: "Check", description: "Attacking the enemy King. The King must escape!", steps: ["Move your queen to threaten the king", "King is in check and must move"], fromSquare: "d1", toSquare: "h5", pieceType: "queen" },
  { id: 11, moveName: "Blocking Check", description: "When in check, you can block with another piece", steps: ["Enemy queen checks your king", "Move bishop to block the attack"], fromSquare: "c1", toSquare: "e3", pieceType: "bishop" },
  { id: 12, moveName: "Pin", description: "A piece that can't move because it would expose the king", steps: ["Enemy bishop pins your knight to the king", "Knight can't move"], fromSquare: "c4", toSquare: "f7", pieceType: "bishop" },
  { id: 13, moveName: "Fork", description: "One piece attacks two pieces at once", steps: ["Knight moves to attack both queen and rook", "Enemy must save one piece"], fromSquare: "f3", toSquare: "e5", pieceType: "knight" },
  { id: 14, moveName: "Skewer", description: "Attack valuable piece, forcing it to move and expose a piece behind", steps: ["Rook attacks queen", "Queen moves, rook captures bishop behind"], fromSquare: "a1", toSquare: "a8", pieceType: "rook" },
  { id: 15, moveName: "Discovery", description: "Moving a piece reveals an attack from piece behind it", steps: ["Move knight", "Bishop behind delivers check"], fromSquare: "e4", toSquare: "d6", pieceType: "knight" },
  { id: 16, moveName: "Double Check", description: "Two pieces check the king simultaneously - king must move", steps: ["Knight moves and bishop behind checks", "King has no blocks, must move"], fromSquare: "f6", toSquare: "e8", pieceType: "knight" },
  { id: 17, moveName: "Back Rank Mate", description: "Checkmate on the back rank when king can't escape", steps: ["Rook to 8th rank", "Enemy king trapped by own pawns"], fromSquare: "d1", toSquare: "d8", pieceType: "rook" },
  { id: 18, moveName: "Scholar's Mate", description: "Quick checkmate targeting f7/f2 weak square", steps: ["Queen and bishop attack f7", "Checkmate in 4 moves"], fromSquare: "d1", toSquare: "h5", pieceType: "queen" },
  { id: 19, moveName: "Stalemate", description: "King not in check but has no legal moves - it's a draw!", steps: ["King can't move", "Not in check = stalemate"], fromSquare: "", toSquare: "", pieceType: "king" },
  { id: 20, moveName: "Promotion", description: "Pawn reaches the opposite end and becomes any piece (usually queen)", steps: ["Pawn reaches 8th rank", "Choose promotion piece"], fromSquare: "e7", toSquare: "e8", pieceType: "pawn" },
  { id: 21, moveName: "Center Control", description: "Control the 4 central squares (e4, e5, d4, d5) for better position", steps: ["Place pawns in center", "Control key squares"], fromSquare: "e2", toSquare: "e4", pieceType: "pawn" },
  { id: 22, moveName: "Development", description: "Bring pieces out from starting positions in the opening", steps: ["Move knights and bishops", "Castle early"], fromSquare: "g1", toSquare: "f3", pieceType: "knight" },
  { id: 23, moveName: "Tempo", description: "Gaining time by forcing opponent to move the same piece twice", steps: ["Attack piece with developing move", "Opponent wastes time moving it again"], fromSquare: "f1", toSquare: "c4", pieceType: "bishop" },
  { id: 24, moveName: "Zugzwang", description: "Position where any move worsens your situation", steps: ["King must move", "Any move loses material or position"], fromSquare: "", toSquare: "", pieceType: "king" },
  { id: 25, moveName: "Smothered Mate", description: "Knight delivers checkmate and king is blocked by own pieces", steps: ["Knight checks king", "King surrounded by own pieces"], fromSquare: "e7", toSquare: "f5", pieceType: "knight" },
];

// Chess Basics Tutorial Data
interface ChessPiece {
  id: number;
  name: string;
  symbol: string;
  unicode: string;
  description: string;
  movePattern: string;
  value: number;
  examples: string[];
  demoSquares: string[];
}

const chessBasicsPieces: ChessPiece[] = [
  {
    id: 1,
    name: "Pawn",
    symbol: "P",
    unicode: "♟",
    description: "The foot soldier of your army. Small but mighty when used correctly.",
    movePattern: "Moves forward one square (or two on first move). Captures diagonally forward.",
    value: 1,
    examples: [
      "Place pawn on e2",
      "Can move to e3 or e4 (first move)",
      "If enemy on d3 or f3, can capture diagonally"
    ],
    demoSquares: ["e2", "e3", "e4", "d3", "f3"]
  },
  {
    id: 2,
    name: "Knight",
    symbol: "N",
    unicode: "♞",
    description: "The only piece that can jump over others. Moves in an L-shape.",
    movePattern: "L-shaped move: 2 squares in one direction, then 1 square perpendicular.",
    value: 3,
    examples: [
      "Place knight on e4",
      "Can jump to: d6, f6, g5, g3, f2, d2, c3, c5",
      "Jumps over pieces in the way"
    ],
    demoSquares: ["e4", "d6", "f6", "g5", "g3", "f2", "d2", "c3", "c5"]
  },
  {
    id: 3,
    name: "Bishop",
    symbol: "B",
    unicode: "♝",
    description: "Moves diagonally across the board. Each bishop stays on one color forever.",
    movePattern: "Moves diagonally any number of squares. Cannot jump over pieces.",
    value: 3,
    examples: [
      "Place bishop on e4",
      "Can slide to: d5, c6, b7, a8 (diagonal)",
      "Also: f5, g6, h7 (other diagonal)"
    ],
    demoSquares: ["e4", "d5", "c6", "b7", "a8", "f5", "g6", "h7", "d3", "f3"]
  },
  {
    id: 4,
    name: "Rook",
    symbol: "R",
    unicode: "♜",
    description: "The castle tower. Powerful piece that controls ranks and files.",
    movePattern: "Moves horizontally or vertically any number of squares.",
    value: 5,
    examples: [
      "Place rook on e4",
      "Can slide to any square on e-file (e1-e8)",
      "Can slide to any square on 4th rank (a4-h4)"
    ],
    demoSquares: ["e4", "e1", "e8", "a4", "h4", "e5", "e6", "b4", "c4"]
  },
  {
    id: 5,
    name: "Queen",
    symbol: "Q",
    unicode: "♛",
    description: "The most powerful piece! Combines rook and bishop movement.",
    movePattern: "Moves like rook OR bishop - any direction, any distance.",
    value: 9,
    examples: [
      "Place queen on e4",
      "Can move like rook: vertically or horizontally",
      "Can move like bishop: diagonally",
      "Controls maximum squares from center"
    ],
    demoSquares: ["e4", "e8", "h4", "a4", "e1", "h7", "a8", "h1"]
  },
  {
    id: 6,
    name: "King",
    symbol: "K",
    unicode: "♚",
    description: "The most important piece! If your king is checkmated, you lose.",
    movePattern: "Moves one square in any direction. Must stay safe from attacks.",
    value: 999,
    examples: [
      "Place king on e4",
      "Can move to: e5, e3, d4, f4, d5, f5, d3, f3",
      "Cannot move into check!",
      "Special move: Castling with rook"
    ],
    demoSquares: ["e4", "e5", "e3", "d4", "f4", "d5", "f5", "d3", "f3"]
  }
];

const Index = () => {
  // State declarations
  const [showSplash, setShowSplash] = useState(true);
  const [showStory, setShowStory] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<"dashboard" | "lesson" | "badges" | "chess-tutorial" | "chess-basics" | "choose-path">("dashboard");
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentChessMove, setCurrentChessMove] = useState<ChessMove | null>(null);
  const [currentPieceIndex, setCurrentPieceIndex] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [chessboardAnimate, setChessboardAnimate] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [highlightSquares, setHighlightSquares] = useState<string[]>([]);
  const [showChessBasicsFirst, setShowChessBasicsFirst] = useState(true);
  const [isNarrating, setIsNarrating] = useState(false);
  const [narrationEnabled, setNarrationEnabled] = useState(true);
  const [storyStep, setStoryStep] = useState(0);
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('chessverse-language');
    return (saved as Language) || 'en';
  });
  
  const t = getTranslation(language);
  const synth = useRef<SpeechSynthesis | null>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chessverse-language', language);
  }, [language]);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synth.current = window.speechSynthesis;
    }
  }, []);

  // Voice narration function with multi-language support
  const narrateText = (text: string, priority: 'high' | 'normal' = 'normal') => {
    if (!narrationEnabled || !synth.current) return;
    
    // Stop any ongoing narration if high priority
    if (priority === 'high' && synth.current.speaking) {
      synth.current.cancel();
    }
    
    // Don't interrupt ongoing narration for normal priority
    if (priority === 'normal' && synth.current.speaking) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Select voice based on current language
    const voices = synth.current.getVoices();
    let selectedVoice = null;
    
    // USE HINDI FEMALE VOICE FOR ALL LANGUAGES (same as Index.tsx)
    // Stage 1: Try Hindi + Female
    selectedVoice = voices.find(voice => 
      (voice.lang.includes('hi-IN') || voice.lang.includes('hi')) &&
      (voice.name.toLowerCase().includes('female') || 
       voice.name.toLowerCase().includes('woman') || 
       voice.name.toLowerCase().includes('lady'))
    );
    
    // Stage 2: Try any Hindi voice
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => 
        voice.lang.includes('hi-IN') || voice.lang.includes('hi') || voice.name.toLowerCase().includes('hindi')
      );
    }
    
    // Stage 3: Fallback to any Indian voice
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => 
        voice.lang.includes('IN') || voice.name.includes('Indian') || voice.name.includes('India')
      );
    }
    
    // Set language code based on actual content language for proper pronunciation
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    
    // Final fallback: any voice matching the language code
    if (!selectedVoice) {
      const langCode = language === 'hi' ? 'hi' : 'en';
      selectedVoice = voices.find(voice => voice.lang.startsWith(langCode));
    }
    
    // Last resort: first available voice
    if (!selectedVoice && voices.length > 0) {
      selectedVoice = voices[0];
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Adjust speech parameters for clarity
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = language === 'en' ? 1.1 : 1.0; // Higher pitch for English
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsNarrating(true);
    utterance.onend = () => setIsNarrating(false);
    utterance.onerror = () => setIsNarrating(false);
    
    currentUtterance.current = utterance;
    synth.current.speak(utterance);
  };

  // Stop narration function
  const stopNarration = () => {
    if (synth.current && synth.current.speaking) {
      synth.current.cancel();
      setIsNarrating(false);
    }
  };
  
  // Audio setup - Using useRef to persist audio instances without causing re-renders
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const successSoundRef = useRef<HTMLAudioElement | null>(null);
  const errorSoundRef = useRef<HTMLAudioElement | null>(null);
  const moveSoundRef = useRef<HTMLAudioElement | null>(null);
  const levelUpSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // Chess piece sound effects
  const pawnSoundRef = useRef<HTMLAudioElement | null>(null);
  const knightSoundRef = useRef<HTMLAudioElement | null>(null);
  const bishopSoundRef = useRef<HTMLAudioElement | null>(null);
  const rookSoundRef = useRef<HTMLAudioElement | null>(null);
  const queenSoundRef = useRef<HTMLAudioElement | null>(null);
  const kingSoundRef = useRef<HTMLAudioElement | null>(null);
  
  const [progress, setProgress] = useState<UserProgress>({
    username: "Knight Errant",
    level: 1,
    xp: 0,
    streak: 0,
    completedLessons: [],
    badges: [],
    lastVisit: new Date().toISOString().split('T')[0],
    chessBasicsCompleted: false
  });

  // Initialize audio refs once on mount
  useEffect(() => {
    // Removed continuous background music - keeping only sound effects
    
    if (!successSoundRef.current) {
      // Victory/success sound
      successSoundRef.current = new Audio('https://freesound.org/data/previews/171/171671_2437358-lq.mp3');
      successSoundRef.current.volume = 0.6;
    }
    
    if (!errorSoundRef.current) {
      // Error/wrong answer sound
      errorSoundRef.current = new Audio('https://freesound.org/data/previews/415/415209_5121236-lq.mp3');
      errorSoundRef.current.volume = 0.5;
    }
    
    if (!moveSoundRef.current) {
      // Click/move sound
      moveSoundRef.current = new Audio('https://freesound.org/data/previews/254/254316_4062622-lq.mp3');
      moveSoundRef.current.volume = 0.4;
    }
    
    if (!levelUpSoundRef.current) {
      // Level up/achievement sound
      levelUpSoundRef.current = new Audio('https://freesound.org/data/previews/270/270319_5123851-lq.mp3');
      levelUpSoundRef.current.volume = 0.7;
    }
    
    // Chess piece sounds
    if (!pawnSoundRef.current) {
      pawnSoundRef.current = new Audio('https://freesound.org/data/previews/536/536450_11861866-lq.mp3');
      pawnSoundRef.current.volume = 0.5;
    }
    
    if (!knightSoundRef.current) {
      knightSoundRef.current = new Audio('https://freesound.org/data/previews/442/442943_5121236-lq.mp3');
      knightSoundRef.current.volume = 0.5;
    }
    
    if (!bishopSoundRef.current) {
      bishopSoundRef.current = new Audio('https://freesound.org/data/previews/156/156859_2538033-lq.mp3');
      bishopSoundRef.current.volume = 0.5;
    }
    
    if (!rookSoundRef.current) {
      rookSoundRef.current = new Audio('https://freesound.org/data/previews/270/270333_5123851-lq.mp3');
      rookSoundRef.current.volume = 0.5;
    }
    
    if (!queenSoundRef.current) {
      queenSoundRef.current = new Audio('https://freesound.org/data/previews/320/320181_5260872-lq.mp3');
      queenSoundRef.current.volume = 0.6;
    }
    
    if (!kingSoundRef.current) {
      kingSoundRef.current = new Audio('https://freesound.org/data/previews/274/274765_5123851-lq.mp3');
      kingSoundRef.current.volume = 0.6;
    }
  }, []);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("codequest-progress");
    if (saved) {
      const loaded = JSON.parse(saved);
      setProgress(loaded);
      
      // Only hide splash and skip to dashboard if user has visited before
      if (loaded.chessBasicsCompleted) {
        setShowSplash(false);
        setShowChessBasicsFirst(false);
        setCurrentScreen("dashboard");
      } else {
        // User hasn't completed chess basics yet - show choice screen
        setShowSplash(false);
        setCurrentScreen("choose-path");
      }
      
      // Check streak
      const today = new Date().toISOString().split('T')[0];
      const lastVisit = new Date(loaded.lastVisit);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (loaded.lastVisit === today) {
        // Same day, keep streak
      } else if (loaded.lastVisit === yesterday.toISOString().split('T')[0]) {

  // Auto-narrate chess piece when it changes
  useEffect(() => {
    if (currentScreen === 'chess-basics' && chessBasicsPieces[currentPieceIndex]) {
      const piece = chessBasicsPieces[currentPieceIndex];
      const welcomeText = t.narration.pieceWelcome(piece.name, piece.description);
      setTimeout(() => narrateText(welcomeText, 'normal'), 500);
    }
  }, [currentPieceIndex, currentScreen]);

  // Auto-narrate story steps
  useEffect(() => {
    if (showStory && storyStep > 0) {
      const storySteps = [
        { text: t.narration.storyTitle },
        { text: t.narration.storyMission },
        { text: t.narration.missionObjective },
        { text: t.narration.whyChess },
        { text: t.narration.whyCoding },
        { text: t.narration.theConnection },
      ];
      if (storySteps[storyStep]) {
        setTimeout(() => narrateText(storySteps[storyStep].text, 'high'), 300);
      }
    }
  }, [storyStep, showStory]);
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

  // Handle music - removed continuous background music
  useEffect(() => {
    // Background music removed to avoid annoyance
    // Only sound effects will play on user actions
  }, [isMuted, audioInitialized]);

  // Debug logging
  console.log("Dashboard render - currentScreen:", currentScreen, "showSplash:", showSplash);

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
    
    // Narrate lesson introduction using translated text
    const lessonIntro = t.narration.lessonIntro(lesson.id, lesson.title, lesson.analogy);
    setTimeout(() => narrateText(lessonIntro, 'normal'), 800);
    
    // Play move sound when starting lesson
    if (!isMuted && moveSoundRef.current) {
      moveSoundRef.current.currentTime = 0;
      moveSoundRef.current.play().catch((e) => console.log("Move sound error:", e));
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
        isCorrect = codeCheck.includes("malloc") && codeCheck.includes("free") && codeCheck.includes("pawns");
        break;
      case 21:
        isCorrect = codeCheck.includes("enum") && codeCheck.includes("piecetype");
        break;
      case 22:
        isCorrect = codeCheck.includes("typedef") && (codeCheck.includes("coordinate") || codeCheck.includes("position"));
        break;
      case 23:
        isCorrect = codeCheck.includes("factorial") && codeCheck.includes("return") && (codeCheck.includes("factorial(n") || codeCheck.includes("factorial(n-1)"));
        break;
      case 24:
        isCorrect = codeCheck.includes("#define") && codeCheck.includes("board_size");
        break;
      case 25:
        isCorrect = codeCheck.includes("struct piece") && codeCheck.includes("board[") && (codeCheck.includes("movepiece") || codeCheck.includes("file *"));
        break;
      default:
        isCorrect = false;
    }
    
    if (isCorrect) {
      // Trigger chessboard animation FIRST
      setChessboardAnimate(true);
      
      // Play success sound
      if (!isMuted && successSoundRef.current) {
        successSoundRef.current.currentTime = 0;
        successSoundRef.current.play().catch((e) => console.log("Success sound error:", e));
      }
      
      // Narrate success message using translated text
      narrateText(t.narration.successMessage, 'high');
      
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
          setTimeout(() => {
            levelUpSoundRef.current!.currentTime = 0;
            levelUpSoundRef.current!.play().catch((e) => console.log("Level up sound error:", e));
          }, 500);
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
        errorSoundRef.current.currentTime = 0;
        errorSoundRef.current.play().catch((e) => console.log("Error sound error:", e));
      }
      
      // Narrate error feedback using translated text
      narrateText(t.narration.errorMessage, 'normal');
      
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
      
      // Narrate hint using translated text
      narrateText(t.narration.hintMessage(currentLesson.hint), 'normal');
      
      toast({
        title: "Solution Revealed",
        description: "Study the code carefully!",
      });
    }
  };

  // Render splash screen first on initial load
  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-950 to-cyan-950 flex items-center justify-center z-50 animate-fade-in">
        <div className="text-center space-y-6 sm:space-y-8 px-4">
          {/* Language Selector */}
          <div className="absolute top-4 right-4">
            <div className="flex gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-cyan-500/30">
              <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'bg-cyan-500 text-black font-bold' : 'text-cyan-400'}
              >
                EN
              </Button>
              <Button
                variant={language === 'hi' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('hi')}
                className={language === 'hi' ? 'bg-cyan-500 text-black font-bold' : 'text-cyan-400'}
              >
                हिं
              </Button>
            </div>
          </div>
           <div className="text-6xl sm:text-8xl bounce-in">
            <span className="inline-block float">♞</span>
            <span className="text-cyan-400 ml-4 font-mono bounce-in" style={{ animationDelay: "0.3s" }}>{"}"}</span>
          </div>
           <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gradient-animate float font-mono">
            {t.appTitle}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-cyan-300/90 italic px-4 font-mono">
            <span className="text-pink-400">{language === 'en' ? 'Neural' : language === 'hi' ? 'न्यूरल' : 'ન્યુરલ'}</span> {t.tagline.replace('Neural ', '').replace('न्यूरल ', '').replace('ન્યુરલ ', '')}
          </p>
          <div className="space-y-2 text-cyan-400/90 animate-fade-in text-xs sm:text-sm font-mono">
            <p>{t.coreDeveloper} <span className="text-pink-400">Parth D. Joshi</span></p>
            <p className="text-[10px] sm:text-xs">{t.assistantProfessor}</p>
            <p className="mt-3 sm:mt-4">{t.systemArchitect} <span className="text-purple-400">Dr. Manish Shah</span></p>
            <p className="text-[10px] sm:text-xs">{t.president}</p>
          </div>
          <Button
            onClick={async () => {
              setShowSplash(false);
              setShowStory(true);
              setStoryStep(0);
              setAudioInitialized(true);
              
              // Narrate story title after a short delay
              setTimeout(() => narrateText(t.narration.storyTitle, 'high'), 1000);
              
              // Play sound effect immediately on click
              if (moveSoundRef.current) {
                try {
                  await moveSoundRef.current.play();
                  console.log("Move sound played");
                } catch (e) {
                  console.log("Move sound error:", e);
                }
              }
            }}
            size="lg"
            className="mt-6 sm:mt-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-black font-bold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl shadow-lg border-2 border-cyan-400/50 shadow-cyan-500/50 hover:shadow-pink-500/50 hover:scale-105 animate-pulse font-mono"
          >
            <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            {t.jackIn}
          </Button>
        </div>
      </div>
    );
  }

  // Story Introduction Screen - Animated mission briefing
  if (showStory) {
    const storySteps = [
      { icon: "🎯", text: t.narration.storyTitle, narration: t.narration.storyTitle },
      { icon: "📖", text: t.narration.storyMission, narration: t.narration.storyMission },
      { icon: "🎮", text: t.narration.missionObjective, narration: t.narration.missionObjective },
      { icon: "♟️", text: t.narration.whyChess, narration: t.narration.whyChess },
      { icon: "💻", text: t.narration.whyCoding, narration: t.narration.whyCoding },
      { icon: "⚡", text: t.narration.theConnection, narration: t.narration.theConnection },
    ];

    const currentStoryStep = storySteps[storyStep];

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-950 to-cyan-950 flex items-center justify-center z-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
        </div>

        {/* Floating Chess Pieces Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-4xl opacity-20 animate-float">♔</div>
          <div className="absolute top-20 right-20 text-5xl opacity-15 animate-float" style={{animationDelay: '1s'}}>♕</div>
          <div className="absolute bottom-20 left-20 text-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}>♞</div>
          <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}>♟</div>
          <div className="absolute top-1/3 left-1/4 text-6xl opacity-10 animate-float" style={{animationDelay: '0.5s'}}>{ "{}" }</div>
          <div className="absolute top-2/3 right-1/4 text-5xl opacity-15 animate-float" style={{animationDelay: '2.5s'}}>{ "</>" }</div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-black/50 backdrop-blur-xl border-2 border-cyan-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl shadow-cyan-500/20">
            {/* Story Icon */}
            <div className="text-center mb-6 animate-scale-in">
              <div className="text-8xl sm:text-9xl mb-4 inline-block animate-float">
                {currentStoryStep.icon}
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-center font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 animate-fade-in">
                {storyStep === 0 ? currentStoryStep.text : ""}
              </h2>
              
              {storyStep > 0 && (
                <p className="text-base sm:text-lg lg:text-xl text-cyan-100 leading-relaxed text-center animate-fade-in font-mono">
                  {currentStoryStep.text}
                </p>
              )}

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 pt-4">
                {storySteps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === storyStep 
                        ? "w-8 bg-cyan-400" 
                        : idx < storyStep 
                          ? "w-2 bg-pink-400" 
                          : "w-2 bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 justify-center pt-6">
                {storyStep < storySteps.length - 1 ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowStory(false);
                        setCurrentScreen("choose-path");
                        stopNarration();
                      }}
                      className="border-gray-500/50 text-gray-400 hover:bg-gray-500/10"
                    >
                      {t.skipStory}
                    </Button>
                    <Button
                      onClick={() => {
                        const nextStep = storyStep + 1;
                        setStoryStep(nextStep);
                        
                        if (!isMuted && moveSoundRef.current) {
                          moveSoundRef.current.currentTime = 0;
                          moveSoundRef.current.play().catch((e) => console.log("Move sound error:", e));
                        }
                      }}
                      className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-black font-bold"
                    >
                      <ChevronRight className="mr-1 w-5 h-5" />
                      {t.continue}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      setShowStory(false);
                      setCurrentScreen("choose-path");
                      stopNarration();
                      
                      if (!isMuted && levelUpSoundRef.current) {
                        levelUpSoundRef.current.currentTime = 0;
                        levelUpSoundRef.current.play().catch((e) => console.log("Level up sound error:", e));
                      }
                    }}
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-black font-bold text-lg px-8 py-6 animate-pulse"
                  >
                    <Play className="mr-2 w-5 h-5" />
                    {t.beginQuest}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Animated Video/GIF Placeholder - Can be replaced with actual video */}
        {storyStep === 5 && (
          <div className="fixed bottom-10 right-10 w-64 h-48 bg-black/80 border-2 border-pink-500/50 rounded-lg overflow-hidden shadow-lg shadow-pink-500/30 animate-scale-in">
            <div className="flex flex-col items-center justify-center h-full p-4">
              <div className="text-6xl mb-2 animate-bounce">♔</div>
              <div className="text-3xl mb-2 text-pink-400">+</div>
              <div className="text-4xl text-cyan-400 font-mono">{ "{}" }</div>
              <p className="text-xs text-cyan-300 mt-2 text-center">Chess + Code = Power!</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Floating Language Selector with Narration Control (visible on all screens except splash)
  const LanguageSelector = () => (
    <div className="fixed top-1 right-1 xs:top-2 xs:right-2 sm:top-4 sm:right-4 z-50 max-w-[calc(100vw-0.5rem)]">
      <div className="flex gap-0.5 sm:gap-2 bg-black/70 backdrop-blur-md p-1 sm:p-2 rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/20 overflow-x-auto">
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('en')}
          className={`text-xs sm:text-sm px-1.5 sm:px-3 py-1 sm:py-2 whitespace-nowrap flex-shrink-0 ${language === 'en' ? 'bg-cyan-500 text-black font-bold' : 'text-cyan-400 hover:text-cyan-300'}`}
        >
          EN
        </Button>
        <Button
          variant={language === 'hi' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('hi')}
          className={`text-xs sm:text-sm px-1.5 sm:px-3 py-1 sm:py-2 whitespace-nowrap flex-shrink-0 ${language === 'hi' ? 'bg-cyan-500 text-black font-bold' : 'text-cyan-400 hover:text-cyan-300'}`}
        >
          हिं
        </Button>
        <div className="w-px bg-cyan-500/30 flex-shrink-0" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setNarrationEnabled(!narrationEnabled);
            if (narrationEnabled) {
              stopNarration();
            }
          }}
          className={`text-sm sm:text-lg px-1 sm:px-2 py-1 sm:py-2 whitespace-nowrap flex-shrink-0 ${narrationEnabled ? 'text-pink-400 hover:text-pink-300' : 'text-gray-500 hover:text-gray-400'}`}
          title={narrationEnabled ? 'Disable Voice Narration' : 'Enable Voice Narration'}
        >
          {isNarrating ? '🔊' : narrationEnabled ? '🎙️' : '🔇'}
        </Button>
      </div>
    </div>
  );

  // Choose Path Screen - appears after splash
  if (currentScreen === "choose-path") {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-950 to-cyan-950 flex items-center justify-center z-50 animate-fade-in">
        <LanguageSelector />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 animate-fade-in">
              {t.choosePath}
            </h1>
            <p className="text-sm sm:text-base lg:text-xl text-cyan-300/90 font-mono">
              {t.selectPath}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Learn Chess Basics */}
            <Card className="border-cyan-500/30 bg-gradient-to-br from-black/50 to-cyan-950/30 shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => {
                console.log("Learn Chess Basics clicked");
                setCurrentScreen("chess-basics");
                setCurrentPieceIndex(0);
                setHighlightSquares([]);
                console.log("State updated: currentScreen = chess-basics, currentPieceIndex = 0");
                
                // Narrate chess basics intro using translated text
                narrateText(t.narration.welcomeChessBasics, 'normal');
                
                if (!isMuted && moveSoundRef.current) {
                  moveSoundRef.current.currentTime = 0;
                  moveSoundRef.current.play().catch((e) => console.log("Move sound error:", e));
                }
              }}
            >
              <CardHeader className="p-6 sm:p-8">
                <div className="text-center space-y-4">
                  <div className="text-6xl sm:text-7xl lg:text-8xl animate-float">
                    ♞
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
                    {t.learnChessBasics}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 pt-0 space-y-4">
                <p className="text-sm sm:text-base text-cyan-100/90 text-center">
                  {language === 'en' ? "Master all 6 chess pieces with interactive 3D demonstrations and unique sounds for each piece." : "इंटरैक्टिव 3D प्रदर्शन और प्रत्येक मोहरे के लिए अनूठी ध्वनि के साथ सभी 6 शतरंज मोहरों में महारत हासिल करें।"}
                </p>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <h3 className="font-bold text-sm sm:text-base mb-2 text-cyan-400 font-mono">{t.whatYouLearn}</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-cyan-100/80">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">♟</span>
                      <span>{t.pawnKnightBishop}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">♜</span>
                      <span>{t.rookQueenKing}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">✨</span>
                      <span>{t.interactiveBoard}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">🔊</span>
                      <span>{t.uniqueSounds}</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-black font-bold text-base sm:text-lg py-6 font-mono group-hover:scale-105 transition-transform">
                  <Crown className="mr-2 w-5 h-5" />
                  {t.startChessTutorial}
                </Button>
              </CardContent>
            </Card>

            {/* Start Quest */}
            <Card className="border-purple-500/30 bg-gradient-to-br from-black/50 to-purple-950/30 shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => {
                setCurrentScreen("dashboard");
                setProgress(prev => ({ ...prev, chessBasicsCompleted: true }));
                if (!isMuted && moveSoundRef.current) {
                  moveSoundRef.current.currentTime = 0;
                  moveSoundRef.current.play().catch((e) => console.log("Move sound error:", e));
                }
              }}
            >
              <CardHeader className="p-6 sm:p-8">
                <div className="text-center space-y-4">
                  <div className="text-6xl sm:text-7xl lg:text-8xl animate-float" style={{ animationDelay: "0.2s" }}>
                    {"{}"}
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {t.startQuest}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 pt-0 space-y-4">
                <p className="text-sm sm:text-base text-cyan-100/90 text-center">
                  {language === 'en' ? "Jump straight into learning C programming through 25 cyberpunk-themed coding challenges." : "25 साइबरपंक-थीम वाली कोडिंग चुनौतियों के माध्यम से सीधे C प्रोग्रामिंग सीखने में कूदें।"}
                </p>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <h3 className="font-bold text-sm sm:text-base mb-2 text-purple-400 font-mono">{t.whatYouGet}</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-cyan-100/80">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">💻</span>
                      <span>{t.interactiveLessons}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">🎮</span>
                      <span>{t.learnMoves}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">🏆</span>
                      <span>{t.unlockBadges}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">⚡</span>
                      <span>{t.levelUpSkills}</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-black font-bold text-base sm:text-lg py-6 font-mono group-hover:scale-105 transition-transform">
                  <Code className="mr-2 w-5 h-5" />
                  {t.beginProgramming}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-xs sm:text-sm text-cyan-400/60 font-mono">
              {t.accessLater}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Chess Basics Tutorial Screen (moved here for proper rendering order)
  if (currentScreen === "chess-basics") {
    console.log("Rendering chess-basics screen, currentPieceIndex:", currentPieceIndex);
    console.log("chessBasicsPieces:", chessBasicsPieces);
    
    // Safety check
    if (!chessBasicsPieces || chessBasicsPieces.length === 0) {
      console.error("chessBasicsPieces is empty or undefined");
      return <div className="min-h-screen flex items-center justify-center text-white">Loading chess pieces...</div>;
    }
    
    // Ensure currentPieceIndex is within bounds
    const safeIndex = Math.max(0, Math.min(currentPieceIndex, chessBasicsPieces.length - 1));
    const currentPiece = chessBasicsPieces[safeIndex];
    
    console.log("Current piece:", currentPiece);
    
    if (!currentPiece) {
      console.error("currentPiece is undefined at index:", safeIndex);
      return <div className="min-h-screen flex items-center justify-center text-white">Error loading piece data</div>;
    }
    
    const playPieceSound = () => {
      if (isMuted) return;
      
      const soundRefs = [pawnSoundRef, knightSoundRef, bishopSoundRef, rookSoundRef, queenSoundRef, kingSoundRef];
      const soundRef = soundRefs[safeIndex];
      
      if (soundRef.current) {
        soundRef.current.currentTime = 0;
        soundRef.current.play().catch((e) => console.log("Piece sound error:", e));
      }
    };
    
    return (
      <div className="min-h-screen p-3 sm:p-6 lg:p-8 bg-gradient-to-br from-black via-purple-950 to-cyan-950">
        <LanguageSelector />
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 animate-fade-in">
              CHESS BASICS TUTORIAL
            </h1>
            <p className="text-sm sm:text-base lg:text-xl text-cyan-300/90 font-mono">
              Master the pieces before you master the code
            </p>
            <div className="flex justify-center gap-2">
              {chessBasicsPieces.map((piece, idx) => (
                <div
                  key={piece.id}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === safeIndex 
                      ? "bg-cyan-400 scale-150" 
                      : idx < safeIndex 
                        ? "bg-pink-400" 
                        : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left: Piece Information */}
            <Card className="border-cyan-500/30 bg-gradient-to-br from-black/50 to-purple-950/30 shadow-2xl">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-6xl sm:text-7xl lg:text-8xl animate-scale-in">
                      {currentPiece.unicode}
                    </div>
                    <div>
                      <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
                        {currentPiece.name}
                      </CardTitle>
                      <Badge className="mt-2 bg-purple-500/20 text-purple-400 border-purple-400 font-mono">
                        Value: {currentPiece.value === 999 ? "∞" : currentPiece.value}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2 text-cyan-400 font-mono">Description:</h3>
                  <p className="text-sm sm:text-base text-cyan-100/90">{currentPiece.description}</p>
                </div>

                <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2 text-pink-400 font-mono">Movement Pattern:</h3>
                  <p className="text-sm sm:text-base text-cyan-100/90">{currentPiece.movePattern}</p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-3 text-purple-400 font-mono">Examples:</h3>
                  <ol className="space-y-2">
                    {currentPiece.examples.map((example, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 font-mono">{idx + 1}</Badge>
                        <span className="text-sm text-cyan-100/90">{example}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <Button
                  onClick={() => {
                    setHighlightSquares(currentPiece.demoSquares);
                    setChessboardAnimate(true);
                    playPieceSound();
                    
                    // Narrate piece information using translated text
                    const narrationText = t.narration.pieceDemo(currentPiece.name, currentPiece.description, currentPiece.movePattern);
                    narrateText(narrationText, 'high');
                    
                    setTimeout(() => setChessboardAnimate(false), 2000);
                  }}
                  className="w-full bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 hover:from-cyan-400 hover:via-pink-400 hover:to-purple-400 text-black font-bold text-lg py-6 font-mono"
                  size="lg"
                >
                  <Sparkles className="mr-2 w-5 h-5" />
                  Demonstrate Move
                </Button>
              </CardContent>
            </Card>

            {/* Right: Interactive 3D Chessboard */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-full max-w-2xl perspective-1000">
                <div className={`grid grid-cols-8 gap-0 border-4 border-cyan-500 rounded-lg overflow-hidden shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  chessboardAnimate ? "animate-scale-in shadow-[0_0_60px_rgba(6,182,212,0.8)] scale-110" : "shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                }`}>
                  {Array.from({ length: 64 }).map((_, i) => {
                    const row = Math.floor(i / 8);
                    const col = i % 8;
                    const isLight = (row + col) % 2 === 0;
                    const rank = 8 - row;
                    const file = String.fromCharCode(97 + col);
                    const square = file + rank;
                    
                    const isHighlighted = highlightSquares.includes(square);
                    const isPrimary = highlightSquares[0] === square;
                    
                    // Display the piece on highlighted squares
                    let piece = "";
                    if (isHighlighted) {
                      piece = currentPiece.unicode;
                    }
                    
                    return (
                      <div
                        key={i}
                        className={`aspect-square flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl font-bold transition-all duration-500 ${
                          isLight ? "bg-chess-light" : "bg-chess-dark"
                        } ${
                          isPrimary 
                            ? "bg-pink-400/60 ring-4 ring-pink-400 animate-pulse z-10" 
                            : isHighlighted 
                              ? "bg-cyan-400/40 ring-2 ring-cyan-400" 
                              : ""
                        } ${
                          isHighlighted && chessboardAnimate ? "scale-110" : ""
                        }`}
                        style={{
                          transform: isHighlighted && chessboardAnimate ? `translateZ(20px)` : 'none'
                        }}
                      >
                        <span className={chessboardAnimate && isHighlighted ? "animate-bounce-in text-white drop-shadow-[0_0_10px_rgba(6,182,212,1)]" : "text-white/90"}>
                          {piece}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-around mt-3 text-sm sm:text-base text-cyan-400/80 font-mono font-bold">
                  {["a", "b", "c", "d", "e", "f", "g", "h"].map(f => (
                    <span key={f} className="text-center w-[12.5%]">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Button
              onClick={() => {
                if (currentPieceIndex > 0) {
                  const newIndex = currentPieceIndex - 1;
                  setCurrentPieceIndex(newIndex);
                  setHighlightSquares([]);
                  setChessboardAnimate(false);
                  
                  // Narrate previous piece using translated text
                  const piece = chessBasicsPieces[newIndex];
                  narrateText(t.narration.previousPiece(piece.name), 'normal');
                  
                  if (!isMuted && moveSoundRef.current) {
                    moveSoundRef.current.currentTime = 0;
                    moveSoundRef.current.play().catch((e) => console.log("Move sound error:", e));
                  }
                }
              }}
              disabled={currentPieceIndex === 0}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-cyan-500/50 text-cyan-400 disabled:opacity-30 font-mono"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Previous Piece
            </Button>

            <div className="text-center">
              <p className="text-lg font-mono text-cyan-400">
                Piece <span className="text-pink-400 font-bold">{safeIndex + 1}</span> of <span className="text-pink-400 font-bold">{chessBasicsPieces.length}</span>
              </p>
            </div>

            {currentPieceIndex < chessBasicsPieces.length - 1 ? (
              <Button
                onClick={() => {
                  const newIndex = currentPieceIndex + 1;
                  setCurrentPieceIndex(newIndex);
                  setHighlightSquares([]);
                  setChessboardAnimate(false);
                  
                  // Narrate next piece using translated text
                  const piece = chessBasicsPieces[newIndex];
                  narrateText(t.narration.nextPiece(piece.name), 'normal');
                  
                  if (!isMuted && moveSoundRef.current) {
                    moveSoundRef.current.currentTime = 0;
                    moveSoundRef.current.play().catch((e) => console.log("Move sound error:", e));
                  }
                }}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-pink-500/50 text-pink-400 font-mono"
              >
                Next Piece
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setShowChessBasicsFirst(false);
                  setCurrentScreen("dashboard");
                  setHighlightSquares([]);
                  
                  // Mark chess basics as completed in progress
                  setProgress(prev => ({ ...prev, chessBasicsCompleted: true }));
                  
                  // Narrate completion using translated text
                  narrateText(t.narration.chessComplete, 'high');
                  
                  if (!isMuted && levelUpSoundRef.current) {
                    levelUpSoundRef.current.currentTime = 0;
                    levelUpSoundRef.current.play().catch((e) => console.log("Level up sound error:", e));
                  }
                  
                  toast({
                    title: "🎓 Chess Basics Mastered!",
                    description: "Ready to learn C programming!",
                  });
                }}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 hover:from-cyan-400 hover:via-pink-400 hover:to-purple-400 text-black font-bold text-lg px-8 py-6 font-mono animate-pulse"
              >
                <Trophy className="mr-2 w-5 h-5" />
                Start Quest
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  if (currentScreen === "dashboard") {
    return (
      <div className="min-h-screen p-3 sm:p-6 lg:p-8">
        <LanguageSelector />
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-2 sm:gap-3 font-mono">
                <Crown className="text-cyan-400 w-8 h-8 sm:w-10 sm:h-10" />
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CHESS<span className="text-pink-400">VERSE</span>
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-cyan-300/80 mt-1 sm:mt-2 font-mono">Neural C Programming Grid</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentScreen("chess-basics");
                  setCurrentPieceIndex(0);
                  setHighlightSquares([]);
                }}
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 font-mono"
                title="Review Chess Basics"
              >
                <Crown className="w-4 h-4 mr-1" />
                Chess Basics
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newMutedState = !isMuted;
                  setIsMuted(newMutedState);
                  
                  // Ensure audio is initialized and try to play
                  if (!audioInitialized) {
                    setAudioInitialized(true);
                  }
                  
                  if (!newMutedState && audioRef.current) {
                    audioRef.current.play().catch(e => {
                      console.log("Audio toggle failed:", e);
                      toast({
                        title: "Audio Notice",
                        description: "Click anywhere to enable audio",
                      });
                    });
                  } else if (audioRef.current) {
                    audioRef.current.pause();
                  }
                }}
                className="rounded-full"
                title={isMuted ? "Unmute music" : "Mute music"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* User Profile Card */}
          <Card className="border-cyan-500/30 shadow-lg shadow-cyan-500/20 hover-lift slide-up bg-gradient-to-br from-black/50 to-purple-950/30">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl flex flex-wrap items-center gap-2 font-mono">
                    <span className="truncate text-cyan-400">{progress.username}</span>
                    <Badge variant="outline" className="bg-purple-500/20 text-pink-400 border-pink-400 text-xs whitespace-nowrap font-mono">
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
              <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 font-mono">
                <Sparkles className="text-cyan-400 w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">NEURAL NETWORK PATHWAYS</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-purple-300/80 font-mono">Journey from Data Node to System Core</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {lessons.map((lesson) => {
                  const isCompleted = progress.completedLessons.includes(lesson.id);
                  const isLocked = lesson.id > 1 && !progress.completedLessons.includes(lesson.id - 1);
                  
                  return (
                     <Card
                      key={lesson.id}
                      className={`cursor-pointer transition-all duration-300 hover-lift font-mono ${
                        isCompleted 
                          ? "border-cyan-500 bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/30 slide-up" 
                          : isLocked
                          ? "opacity-50 cursor-not-allowed"
                          : "border-pink-500/50 pulse-glow hover:shadow-lg hover:shadow-pink-500/30 slide-up"
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
                              {isCompleted && <CheckCircle2 className="text-cyan-400 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />}
                            </div>
                            <CardTitle className="text-sm sm:text-base lg:text-lg truncate">{lesson.title}</CardTitle>
                            <CardDescription className="text-xs sm:text-sm mt-1 line-clamp-2">
                              {lesson.subtitle}
                            </CardDescription>
                          </div>
                          {!isLocked && (
                            <ChevronRight className={`${isCompleted ? "text-cyan-400" : "text-pink-400"} w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0`} />
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
          <div className="text-center text-[10px] sm:text-xs lg:text-sm text-cyan-400/80 border-t border-cyan-500/30 pt-4 pb-2 space-y-1 font-mono">
            <p>CORE DEVELOPER: <span className="text-pink-400 font-medium">Parth D. Joshi</span> (Assistant Professor)</p>
            <p>SYSTEM ARCHITECT: <span className="text-purple-400 font-medium">Dr. Manish Shah</span> (President, LJK)</p>
          </div>
        </div>
      </div>
    );
  }

  // Chess Tutorial Screen
  if (currentScreen === "chess-tutorial" && currentChessMove) {
    return (
      <div className="min-h-screen p-3 sm:p-6 lg:p-8 bg-gradient-to-br from-black via-purple-950 to-cyan-950">
        <LanguageSelector />
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setCurrentScreen("dashboard");
                setHighlightSquares([]);
              }}
              className="border-cyan-500/50 text-cyan-400"
            >
              ← Dashboard
            </Button>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
              Chess Move Tutorial
            </h1>
          </div>

          <Card className="border-cyan-500/30 bg-gradient-to-br from-black/50 to-purple-950/30">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl flex items-center gap-3 font-mono">
                <Crown className="text-cyan-400 w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-pink-400">{currentChessMove.moveName}</span>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-cyan-300/90 mt-2">
                {currentChessMove.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Instructions */}
                <div className="space-y-4">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-3 text-purple-400 font-mono">How to Execute:</h3>
                    <ol className="space-y-2">
                      {currentChessMove.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 font-mono">{idx + 1}</Badge>
                          <span className="text-sm text-cyan-100/90">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                    <h3 className="font-bold text-base mb-2 text-cyan-400 font-mono">Move Details:</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-pink-400">Piece:</span> <span className="text-cyan-100/90 capitalize">{currentChessMove.pieceType}</span></p>
                      {currentChessMove.fromSquare && (
                        <p><span className="text-pink-400">From:</span> <span className="text-cyan-100/90">{currentChessMove.fromSquare}</span></p>
                      )}
                      {currentChessMove.toSquare && (
                        <p><span className="text-pink-400">To:</span> <span className="text-cyan-100/90">{currentChessMove.toSquare}</span></p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        // Highlight the move
                        if (currentChessMove.fromSquare && currentChessMove.toSquare) {
                          setHighlightSquares([currentChessMove.fromSquare, currentChessMove.toSquare]);
                          setChessboardAnimate(true);
                          setTimeout(() => setChessboardAnimate(false), 2000);
                        }
                      }}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-bold font-mono"
                    >
                      <Sparkles className="mr-2 w-4 h-4" />
                      Show Move
                    </Button>
                    <Button
                      onClick={() => {
                        setHighlightSquares([]);
                        setChessboardAnimate(false);
                      }}
                      variant="outline"
                      className="border-pink-500/50 text-pink-400 font-mono"
                    >
                      Reset
                    </Button>
                  </div>
                </div>

                {/* Interactive Chessboard */}
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className={`grid grid-cols-8 gap-0 border-4 border-cyan-500 rounded-lg overflow-hidden shadow-2xl transition-all duration-500 ${
                      chessboardAnimate ? "animate-scale-in shadow-[0_0_40px_rgba(6,182,212,0.6)]" : ""
                    }`}>
                      {Array.from({ length: 64 }).map((_, i) => {
                        const row = Math.floor(i / 8);
                        const col = i % 8;
                        const isLight = (row + col) % 2 === 0;
                        const rank = 8 - row;
                        const file = String.fromCharCode(97 + col);
                        const square = file + rank;
                        
                        const isHighlighted = highlightSquares.includes(square);
                        const isFrom = square === currentChessMove.fromSquare;
                        const isTo = square === currentChessMove.toSquare;
                        
                        // Display pieces for demonstration
                        let piece = "";
                        if (isFrom || (isTo && chessboardAnimate)) {
                          if (currentChessMove.pieceType === "pawn") piece = "♙";
                          else if (currentChessMove.pieceType === "knight") piece = "♘";
                          else if (currentChessMove.pieceType === "bishop") piece = "♗";
                          else if (currentChessMove.pieceType === "rook") piece = "♖";
                          else if (currentChessMove.pieceType === "queen") piece = "♕";
                          else if (currentChessMove.pieceType === "king") piece = "♔";
                        }
                        
                        return (
                          <div
                            key={i}
                            className={`aspect-square flex items-center justify-center text-3xl md:text-4xl lg:text-5xl font-bold transition-all duration-300 ${
                              isLight ? "bg-chess-light" : "bg-chess-dark"
                            } ${isHighlighted ? "bg-cyan-400/50 ring-2 ring-cyan-400 animate-pulse" : ""} ${
                              isFrom ? "bg-pink-400/50 ring-2 ring-pink-400" : ""
                            } ${isTo && chessboardAnimate ? "bg-purple-400/50 ring-2 ring-purple-400 scale-110" : ""}`}
                          >
                            <span className={chessboardAnimate && isTo ? "animate-scale-in" : ""}>
                              {piece}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-around mt-2 text-xs text-cyan-400/80 font-mono">
                      {["a", "b", "c", "d", "e", "f", "g", "h"].map(f => (
                        <span key={f} className="text-center w-[12.5%]">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => {
                    setCurrentScreen("dashboard");
                    setHighlightSquares([]);
                  }}
                  variant="outline"
                  className="flex-1 border-cyan-500/50 text-cyan-400 font-mono"
                >
                  <Home className="mr-2 w-4 h-4" />
                  Back to Dashboard
                </Button>
                {currentLesson && lessons.find(l => l.id === currentLesson.id + 1) && (
                  <Button
                    onClick={() => {
                      const nextLesson = lessons.find(l => l.id === currentLesson!.id + 1);
                      if (nextLesson) {
                        startLesson(nextLesson);
                        setHighlightSquares([]);
                      }
                    }}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-bold font-mono"
                  >
                    Next Lesson
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Badges Screen
  if (currentScreen === "badges") {
    return (
      <div className="min-h-screen p-3 sm:p-6 lg:p-8">
        <LanguageSelector />
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button variant="outline" size="sm" onClick={() => setCurrentScreen("dashboard")}>
              ← Back
            </Button>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-2 sm:gap-3 font-mono">
              <Trophy className="text-cyan-400 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">ACHIEVEMENT VAULT</span>
            </h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {allBadges.map((badge) => {
              const earned = progress.badges.includes(badge.id);
              return (
                <Card
                  key={badge.id}
                  className={`text-center font-mono ${
                    earned 
                      ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20" 
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
        <LanguageSelector />
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
                        moveSoundRef.current.currentTime = 0;
                        moveSoundRef.current.play().catch((e) => console.log("Move sound error:", e));
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
                      moveSoundRef.current.currentTime = 0;
                      moveSoundRef.current.play().catch((e) => console.log("Move sound error:", e));
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
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400"
                    onClick={() => {
                      setShowSuccessModal(false);
                      // Show chess tutorial for completed lesson
                      const chessMove = chessMoves.find(m => m.id === currentLesson.id);
                      if (chessMove) {
                        setCurrentChessMove(chessMove);
                        setCurrentScreen("chess-tutorial");
                      } else {
                        setCurrentScreen("badges");
                      }
                    }}
                  >
                    Learn Chess Move ♟️
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowSuccessModal(false);
                  // Show chess tutorial
                  const chessMove = chessMoves.find(m => m.id === currentLesson!.id);
                  if (chessMove) {
                    setCurrentChessMove(chessMove);
                    setCurrentScreen("chess-tutorial");
                  }
                }}
                className="w-full text-xs text-cyan-400 hover:text-cyan-300"
              >
                or Learn Chess Move First →
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="min-h-screen w-full p-1.5 sm:p-3 md:p-4 lg:p-6">
        <div className="max-w-full md:max-w-[1800px] mx-auto space-y-2 sm:space-y-3 md:space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3">
            <Button variant="outline" size="sm" onClick={() => setCurrentScreen("dashboard")} className="text-xs sm:text-sm min-h-[40px]">
              ← Back
            </Button>
            <Badge variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 py-1 border-cyan-500 text-cyan-400 bg-cyan-500/10 font-mono break-words">
              Protocol {currentLesson.id}: {currentLesson.title}
            </Badge>
          </div>

          {/* Dual Pane - Stack on mobile, side-by-side on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 h-auto md:h-[calc(100vh-120px)]">
            {/* Left Pane - The Codex */}
            <Card className="flex flex-col overflow-hidden h-auto md:h-full">
              <CardHeader className="p-2 sm:p-3 md:p-4 lg:p-6 pb-1 sm:pb-2 md:pb-3">
                <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-lg font-mono break-words">
                  <Code className="text-pink-400 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">THE NEURAL CODEX</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-4 overflow-y-auto p-2 sm:p-3 md:p-4 lg:p-6 pt-0">
                {/* Learn Tab */}
                <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-1.5 sm:p-2 md:p-3 lg:p-4">
                    <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-1.5 md:mb-2 text-purple-400 font-mono">♟️ Chess Protocol</h3>
                    <p className="text-xs sm:text-xs md:text-sm lg:text-base leading-relaxed text-purple-200/90">{currentLesson.analogy}</p>
                  </div>
                  
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-1.5 sm:p-2 md:p-3 lg:p-4">
                    <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-1.5 md:mb-2 text-cyan-400 font-mono">💻 C Syntax</h3>
                    <p className="text-xs sm:text-xs md:text-sm lg:text-base leading-relaxed text-cyan-200/90">{currentLesson.explanation}</p>
                  </div>
                </div>

                {/* Challenge */}
                <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-2 border-pink-500/50 rounded-lg p-1.5 sm:p-2 md:p-3 lg:p-4">
                  <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-1.5 sm:mb-2 flex items-center gap-1 sm:gap-2 font-mono break-words">
                    <Award className="text-pink-400 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">YOUR MISSION</span>
                  </h3>
                  <p className="text-xs sm:text-xs md:text-sm lg:text-base mb-2 sm:mb-2.5 md:mb-3 lg:mb-4">{currentLesson.challenge}</p>
                  
                  {/* Code Editor */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-28 sm:h-36 md:h-40 lg:h-52 xl:h-64 code-editor resize-none focus:ring-2 focus:ring-primary outline-none text-xs sm:text-xs md:text-sm"
                      spellCheck={false}
                    />
                    
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      <Button onClick={runCode} className="flex-1 min-w-[100px] bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-bold text-xs md:text-sm font-mono border border-cyan-400/50 min-h-[36px] sm:min-h-[40px]">
                        <Play className="mr-1 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">EXECUTE</span>
                        <span className="sm:hidden">RUN</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowHint(!showHint)}
                        className="text-xs md:text-sm px-2 sm:px-3 min-h-[36px] sm:min-h-[40px]"
                      >
                        💡 Hint
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={showSolution}
                        className="text-xs md:text-sm px-2 sm:px-3 min-h-[36px] sm:min-h-[40px]"
                      >
                        Sol.
                      </Button>
                    </div>

                    {showHint && (
                      <div className="bg-muted/20 border border-muted rounded p-1.5 sm:p-2 md:p-3 text-xs md:text-sm">
                        <strong>Hint:</strong> {currentLesson.hint}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Pane - The Chessboard */}
            <Card className="flex flex-col overflow-hidden h-auto md:h-full">
              <CardHeader className="p-2 sm:p-3 md:p-4 lg:p-6 pb-1 sm:pb-2 md:pb-3">
                <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-lg font-mono break-words">
                  <Crown className="text-cyan-400 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">DIGITAL GRID</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center p-1.5 sm:p-2 md:p-3 lg:p-4 overflow-auto min-h-[300px] md:min-h-auto">
                <div className="w-full max-w-full px-1 sm:px-2">
                  <div className={`grid grid-cols-8 gap-0 border border-sm:border-2 md:border-3 lg:border-4 border-primary rounded-lg overflow-hidden shadow-lg md:shadow-xl transition-all duration-500 ${
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
                          className={`aspect-square flex items-center justify-center text-sm xs:text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold transition-all duration-300 ${
                            isLight ? "bg-chess-light" : "bg-chess-dark"
                          } ${piece ? "hover:scale-110 cursor-pointer animate-fade-in" : ""} ${
                            shouldHighlight ? "bg-primary/30 animate-pulse ring-1 ring-primary" : ""
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
                  <div className="flex justify-around mt-1 text-[8px] sm:text-xs text-muted-foreground font-mono">
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

  // Fallback - should never reach here, but redirect to dashboard if it does
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button onClick={() => {
        setShowSplash(true);
        setCurrentScreen("dashboard");
      }}>
        Return to Dashboard
      </Button>
    </div>
  );
};

export default Index;
