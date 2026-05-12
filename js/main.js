import { db } from './firebase-config.js';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, getDoc, setDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- UUID Generation & Local Storage ---
function getOrCreateUUID() {
    let uuid = localStorage.getItem('csk_user_uuid');
    if (!uuid) {
        uuid = 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
        localStorage.setItem('csk_user_uuid', uuid);
    }
    return uuid;
}

// --- Vote Logic ---
async function vote(player) {
    const uuid = getOrCreateUUID();
    const hasVoted = localStorage.getItem("csk_has_voted");
    
    if (hasVoted) {
        alert("⚠️ You have already voted! You can only vote once.");
        return;
    }

    try {
        const playerRef = doc(db, "votes", player);
        const playerDoc = await getDoc(playerRef);
        
        if (!playerDoc.exists()) {
            await setDoc(playerRef, { voters: [uuid] });
        } else {
            // Check if user somehow voted already (e.g. cleared local storage)
            const data = playerDoc.data();
            if (data.voters && data.voters.includes(uuid)) {
                localStorage.setItem("csk_has_voted", "true");
                alert("⚠️ You have already voted! You can only vote once.");
                return;
            }
            await updateDoc(playerRef, {
                voters: arrayUnion(uuid)
            });
        }
        
        localStorage.setItem("csk_has_voted", "true");
        alert("🎉 You successfully voted for " + player + "!");
    } catch (e) {
        console.error("Error voting: ", e);
        alert("Failed to submit your vote. Please try again later.");
    }
}
window.vote = vote;

// Listen for votes in real-time
function loadVotes() {
    onSnapshot(collection(db, "votes"), (snapshot) => {
        let total = 0;
        let votedUsers = new Set();
        
        snapshot.forEach((d) => {
            const data = d.data();
            const voters = data.voters || [];
            const count = voters.length;
            total += count;
            
            voters.forEach(v => votedUsers.add(v));
            
            // Update individual player's UI
            const safeId = d.id.replace(/\s+/g, '-');
            const playerVoteCountElement = document.getElementById(`vote-count-${safeId}`);
            if (playerVoteCountElement) {
                playerVoteCountElement.textContent = count + (count === 1 ? " vote" : " votes");
            }
        });
        
        // Update total votes UI
        const totalVotesElement = document.getElementById("totalVotes");
        if (totalVotesElement) {
            totalVotesElement.innerHTML = `Total Votes: ${total} <br><small style="font-size:0.6em; color:#666;">(Total Unique Users: ${votedUsers.size})</small>`;
        }
    });
}

// --- Comment Logic ---
function initComments() {
    const usernameInput = document.getElementById("username");
    if (usernameInput) {
        const storedName = localStorage.getItem("csk_username");
        if (storedName) {
            usernameInput.value = storedName;
        }
        
        // Save to local storage on any input change so it's always up to date
        usernameInput.addEventListener("input", (e) => {
            localStorage.setItem("csk_username", e.target.value.trim());
        });
    }

    // Load comments on page load
    loadComments();
    
    // Load real-time votes on page load
    loadVotes();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComments);
} else {
    initComments();
}

function formatDate(timestamp) {
    if (!timestamp) return new Date().toLocaleString();
    return timestamp.toDate().toLocaleString();
}

async function addComment() {
  let username = document.getElementById("username")?.value.trim();
  let comment = document.getElementById("commentText")?.value.trim();

  if(!username || !comment) {
    alert("Please enter your name and comment");
    return;
  }
  
  // Ensure we save the latest username to local storage
  localStorage.setItem("csk_username", username);

  try {
      await addDoc(collection(db, "comments"), {
          username: username,
          text: comment,
          createdAt: serverTimestamp()
      });
      // Clear comment text but keep username
      document.getElementById("commentText").value = "";
  } catch (e) {
      console.error("Error adding comment: ", e);
      alert("Failed to post comment. Please try again.");
  }
}
window.addComment = addComment;

// Listen for comments in real-time
function loadComments() {
    const commentsList = document.getElementById("commentsList");
    if (!commentsList) return;

    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        commentsList.innerHTML = "";
        snapshot.forEach((doc) => {
            const data = doc.data();
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment-box");
            commentDiv.style.marginBottom = "15px";
            commentDiv.style.padding = "15px";
            commentDiv.style.border = "1px solid #e2e8f0";
            commentDiv.style.borderRadius = "8px";
            commentDiv.style.backgroundColor = "#f8fafc";
            commentDiv.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";

            const timeStr = formatDate(data.createdAt);

            commentDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <h4 style="margin: 0; color: #1e3a8a; font-size: 1.1em;">${data.username}</h4>
                    <small style="color: #64748b; font-size: 0.85em;">${timeStr}</small>
                </div>
                <p style="margin: 10px 0; color: #334155; line-height: 1.5;">${data.text}</p>
                <small style="color: #94a3b8; font-size: 0.7em;">ID: ${doc.id}</small>
            `;
            commentsList.appendChild(commentDiv);
        });
    }, (error) => {
        console.error("Error fetching comments: ", error);
        commentsList.innerHTML = "<p>Error loading comments.</p>";
    });
}
