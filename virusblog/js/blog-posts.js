/*

Format:

{
    title: "Name of title",
    info: "The info",
    pic: "URL of image (size auto-calculates)",
    par: [
        "If you want a new paragraph ...",
        "Then add a comma to the last quote (if there isn't there already)",
        "Then do a new line and make quotes, like this:",
        "",
        "",
        "I'm all the way here!"
    ]
}

*/

var blogPosts = [
    {
        title: "BTW",
        info: "About this blog ...",
        pic: "",
        par: [
            "This blog is for people who need to learn quickly about computer viruses and how to protect themselves from them.",
        ]
    },
    {
        title: "Types of viruses",
        info: "Written by Edward and Bright",
        pic: "/img/virus1.png",
        par: [
            "There are 3 different types of viruses and they all act differently.",
            "There are worms, trojan horses and viruses (why they just called it a virus is beyond me), but they all have the same end goal as any other living organism, and that is to reproduce and wreak havoc."
            ]
    },
    {
        title: "In depth",
        info: "Written at the correct time by Edward and only him",
        pic: "/img/virus2.jpg",
        par: [
            "Yo, this is the part that is actually useful to anybody here, so let's get right into it.",
            "The computer virus at its most simplest is just any piece of malicious software (malware) that infects a sytem and reproduces by copying its source code.",
            "The first type of computer virus is just a virus. It infects a computer by latching itself on another legitimate program and activating when that program is run. Once activated, it replicates its source code and infects the rest of the computer, cause it to crash, run slow or shut down completely.",
            "The next type of virus is the worm. And unlike the virus, it doesnt need a seperate program to infect your system. It finds a security hole through your software, and replicates by replacing your software with its source code until your computer is now actual garbage. It is probably the most destructive of all 3 main categories of virus.",
            "The final virus is the trojan horse. Unlike the other two, this virus doesn't reproduce or replicate. These act as a friendly software, and once tey infect you, it gives the hacker who made it access to your passwords and personal info and the ability to send out spam emails and probaly ruin your life."
        ]
    },
    {
        title: "Positive Applicability",
        info: "Jobs",
        pic: "/img/virus3.png",
        par: [
            "Believe it or not, you can actually get a job with hacking and making viruses. Big names like Facebook or Instagram, or other big businesses will offer good paying jobs to people who can hack into their system and give feedback.",
            "if you have the ability to make viruses or get around firewalls, then try to reach out and show off your expertise.",
            "Facebook paid $500 to the first person who could hack their website. Remeber Putnam?",
        ]
    }
];
