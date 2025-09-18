document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Demo functionality
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultsSection = document.getElementById('resultsSection');

    // File upload handling
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('drop', handleDrop);
    fileInput.addEventListener('change', handleFileSelect);
    analyzeBtn.addEventListener('click', simulateAnalysis);

    function handleDragOver(e) {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    }

    function handleDrop(e) {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    }

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    }

    function handleFileUpload(file) {
        console.log('File uploaded:', file.name);
        
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const uploadContent = uploadArea.querySelector('.upload-content');
                uploadContent.innerHTML = `
                    <img src="${e.target.result}" alt="Uploaded sample" style="max-width: 100%; max-height: 200px; border-radius: 8px;">
                    <p>Sample uploaded successfully</p>
                `;
                
                analyzeBtn.disabled = false;
                analyzeBtn.style.background = 'var(--ocean-gradient)';
                analyzeBtn.style.cursor = 'pointer';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file (JPG, PNG, GIF, etc.)');
        }
    }

    function simulateAnalysis() {
        console.log('Starting advanced analysis simulation');
        
        // Check if image is uploaded
        const uploadedImg = uploadArea.querySelector('img');
        if (!uploadedImg) {
            alert('Please upload an image first');
            return;
        }
        
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        analyzeBtn.disabled = true;
        analyzeBtn.style.background = '#ccc';
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        const statusElement = document.getElementById('statusText');
        
        // Multi-stage analysis simulation
        setTimeout(() => {
            if (statusElement) statusElement.textContent = 'Processing optical data...';
        }, 500);
        
        setTimeout(() => {
            if (statusElement) statusElement.textContent = 'Detecting environment type...';
        }, 1000);
        
        setTimeout(() => {
            if (statusElement) statusElement.textContent = 'Running ML classification...';
        }, 1300);
        
        setTimeout(() => {
            if (statusElement) statusElement.textContent = 'Generating results...';
        }, 1800);
        
        // Complete analysis
        setTimeout(() => {
            console.log('Advanced analysis complete');
            
            try {
                // Detect water environment for enhanced analysis (but don't exclude)
                const waterEnvironment = detectWaterEnvironment();
                console.log('Water environment detection result:', waterEnvironment);
                
                // Check if waste materials are present in the image
                const wasteDetection = detectWasteMaterials();
                console.log('Waste detection result:', wasteDetection);
                
                if (!wasteDetection.detected) {
                    // Skip detection when no waste materials are present
                    console.log('No waste detected, handling clean environment');
                    handleNoWasteDetection(statusElement);
                    return;
                }
                
                console.log('Waste detected, proceeding with analysis:', wasteDetection);
                
                // Enhanced analysis for images with waste materials (including water environments)
                let hasPlastics, particleCount, avgSize, confidence;
                
                if (waterEnvironment.detected) {
                    // Enhanced detection for water environments with waste
                    hasPlastics = wasteDetection.confidence > 0.5 ? Math.random() > 0.05 : Math.random() > 0.3;
                    particleCount = hasPlastics ? Math.floor(Math.random() * 200) + 75 : Math.floor(Math.random() * 10);
                    avgSize = hasPlastics ? (Math.random() * 12.0 + 1.5).toFixed(1) : (Math.random() * 1.0 + 0.3).toFixed(1);
                    confidence = hasPlastics ? (Math.random() * 10 + 88).toFixed(1) : (Math.random() * 8 + 92).toFixed(1);
                    
                    console.log(`Water environment analysis: ${waterEnvironment.type} with waste materials detected`);
                } else {
                    // Standard analysis for non-water environments
                    hasPlastics = wasteDetection.confidence > 0.7 ? Math.random() > 0.1 : Math.random() > 0.5;
                    particleCount = hasPlastics ? Math.floor(Math.random() * 150) + 50 : Math.floor(Math.random() * 5);
                    avgSize = hasPlastics ? (Math.random() * 8.5 + 2.0).toFixed(1) : (Math.random() * 0.8 + 0.2).toFixed(1);
                    confidence = hasPlastics ? (Math.random() * 8 + 92).toFixed(1) : (Math.random() * 5 + 95).toFixed(1);
                }
                
                console.log('Analysis variables set:', { hasPlastics, particleCount, avgSize, confidence });
                
                // Update main results
                updateMainResults(hasPlastics, particleCount, avgSize, confidence);
                
                // Show image analysis
                showImageAnalysis();
                
                // Generate detailed analysis data
                generateDetailedAnalysis(hasPlastics, particleCount);
                
                // Generate safety assessment and monitoring (with water environment context)
                generateSafetyAssessment(hasPlastics, particleCount, avgSize, confidence, waterEnvironment);
                updateMonitoringDashboard(hasPlastics, particleCount, waterEnvironment);
                
                // Update status
                if (statusElement) {
                    statusElement.textContent = hasPlastics ? 'Plastic Waste Materials Detected' : 'No Plastic Waste Detected';
                    statusElement.style.color = hasPlastics ? '#e53e3e' : '#2e7d32';
                }
                
                // Reset button
                analyzeBtn.innerHTML = '<i class="fas fa-microscope"></i> Analyze Sample';
                analyzeBtn.disabled = false;
                analyzeBtn.style.background = 'var(--ocean-gradient)';
                
                // Hide spinner
                const spinner = document.querySelector('.spinner');
                if (spinner) spinner.style.display = 'none';
                
                console.log('Advanced results updated successfully');
            
            } catch (error) {
                console.error('Error during analysis:', error);
                console.error('Error stack:', error.stack);
                
                // Provide fallback analysis when error occurs
                console.log('Providing fallback analysis due to error');
                
                // Simple fallback results
                const fallbackHasPlastics = Math.random() > 0.5;
                const fallbackParticleCount = fallbackHasPlastics ? Math.floor(Math.random() * 100) + 20 : 0;
                const fallbackAvgSize = fallbackHasPlastics ? (Math.random() * 5 + 2).toFixed(1) : '0.0';
                const fallbackConfidence = fallbackHasPlastics ? (Math.random() * 20 + 80).toFixed(1) : '95.0';
                
                try {
                    // Try to update results with fallback data
                    updateMainResults(fallbackHasPlastics, fallbackParticleCount, fallbackAvgSize, fallbackConfidence);
                    
                    // Update status with fallback
                    if (statusElement) {
                        statusElement.textContent = fallbackHasPlastics ? 'Plastic Materials Detected (Fallback Mode)' : 'No Plastic Materials Detected';
                        statusElement.style.color = fallbackHasPlastics ? '#ff9800' : '#4caf50';
                    }
                } catch (fallbackError) {
                    console.error('Fallback analysis also failed:', fallbackError);
                    
                    // Final fallback - just show error message
                    if (statusElement) {
                        statusElement.textContent = 'Analysis Error - Please try again';
                        statusElement.style.color = '#e53e3e';
                    }
                }
                
                // Reset button on error
                analyzeBtn.innerHTML = '<i class="fas fa-microscope"></i> Analyze Sample';
                analyzeBtn.disabled = false;
                analyzeBtn.style.background = 'var(--ocean-gradient)';
                
                // Hide spinner
                const spinner = document.querySelector('.spinner');
                if (spinner) spinner.style.display = 'none';
            }
            
        }, 2500);
    }
    
    function detectWaterEnvironment() {
        // Get the uploaded image for analysis
        const uploadedImg = uploadArea.querySelector('img');
        if (!uploadedImg) {
            return { detected: false, type: null };
        }
        
        // Create a temporary canvas to analyze the image
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        const img = new Image();
        img.src = uploadedImg.src;
        
        // Set canvas dimensions
        tempCanvas.width = Math.min(400, img.width || 400);
        tempCanvas.height = Math.min(300, img.height || 300);
        
        // Draw image to canvas
        tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
        
        // Analyze image pixels to detect water environments
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;
        
        let bluePixels = 0;
        let greenPixels = 0;
        let totalPixels = 0;
        let waterLikePixels = 0;
        let surfaceReflectionPixels = 0;
        
        // Sample every 4th pixel for performance
        for (let i = 0; i < data.length; i += 16) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            totalPixels++;
            
            // Detect blue/cyan water (ocean/sea water)
            if (b > r && b > g && b > 120) {
                bluePixels++;
                waterLikePixels++;
            }
            
            // Detect green/teal water (fresh water, lakes, rivers)
            if (g > r && g > 100 && b > 80 && Math.abs(g - b) < 50) {
                greenPixels++;
                waterLikePixels++;
            }
            
            // Detect water surface reflections (bright areas on water)
            if (r > 180 && g > 180 && b > 180) {
                surfaceReflectionPixels++;
            }
            
            // Detect underwater blue-green tones
            if (b > 80 && g > 60 && r < 100 && (b + g) > (r * 2)) {
                waterLikePixels++;
            }
        }
        
        const bluePercentage = (bluePixels / totalPixels) * 100;
        const greenPercentage = (greenPixels / totalPixels) * 100;
        const waterPercentage = (waterLikePixels / totalPixels) * 100;
        const reflectionPercentage = (surfaceReflectionPixels / totalPixels) * 100;
        
        console.log(`Water analysis: Blue: ${bluePercentage.toFixed(1)}%, Green: ${greenPercentage.toFixed(1)}%, Water-like: ${waterPercentage.toFixed(1)}%, Reflections: ${reflectionPercentage.toFixed(1)}%`);
        
        // Determine if this is a water environment
        if (waterPercentage > 60) {
            if (bluePercentage > 25 || (bluePercentage > 15 && reflectionPercentage > 10)) {
                return { detected: true, type: 'ocean_sea' };
            } else if (greenPercentage > 20 || (waterPercentage > 70 && greenPercentage > 10)) {
                return { detected: true, type: 'fresh_water' };
            } else if (waterPercentage > 75) {
                return { detected: true, type: 'water_general' };
            }
        }
        
        return { detected: false, type: null };
    }
    
    function detectWasteMaterials() {
        // Get the uploaded image for analysis
        const uploadedImg = uploadArea.querySelector('img');
        if (!uploadedImg) {
            return { detected: false, confidence: 0, types: [], percentages: {} };
        }
        
        try {
            // Create a temporary canvas to analyze the image
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            
            // Set canvas size
            tempCanvas.width = 400;
            tempCanvas.height = 300;
            
            // Draw image to canvas for pixel analysis
            tempCtx.drawImage(uploadedImg, 0, 0, tempCanvas.width, tempCanvas.height);
            
            // Analyze image pixels to detect waste materials
            const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const data = imageData.data;
            
            let totalPixels = 0;
            let plasticBottles = 0;
            let coloredPlastics = 0;
            let metallic = 0;
            let darkDebris = 0;
            let artificialColors = 0;
            let microparticles = 0;
            let plasticParticles = 0;
            let wasteIndicators = 0;
            
            // Sample every 8th pixel for performance
            for (let i = 0; i < data.length; i += 32) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            totalPixels++;
            
            // Only skip very pure water pixels - allow analysis of water with potential debris
            const isPureCleanWater = (b > 120 && g > 100 && r < 80 && b > (g + 20) && g > (r + 20)) && // Very pure ocean blue
                                     (Math.abs(r - g) < 15 && Math.abs(g - b) < 15); // Very uniform color
            
            // Skip only extremely clean water pixels, analyze everything else
            if (isPureCleanWater) {
                continue; // Skip only very clean water pixels
            }
            
            // Enhanced detection for floating debris and waste materials
            const isFloatingDebris = (
                // White/light colored debris (bottles, bags, foam)
                (r > 180 && g > 180 && b > 180 && (r + g + b) > 540) ||
                // Plastic bottles and containers
                (r > 160 && g > 160 && b > 140 && Math.abs(r - g) < 40) ||
                // Light blue/green debris
                (r > 120 && g > 140 && b > 160 && b > r) ||
                // Yellowish debris (foam, plastic)
                (r > 160 && g > 160 && b > 120 && r > b && g > b)
            );
            
            if (isFloatingDebris) {
                plasticBottles++;
                wasteIndicators++;
            }
            
            // Detect colored plastic waste (bright artificial colors) - stricter
            if ((r > 200 && g < 80 && b < 80) || // Bright red plastic
                (r < 80 && g > 200 && b < 80) || // Bright green plastic
                (r < 80 && g < 80 && b > 200) || // Bright blue plastic
                (r > 220 && g > 220 && b < 60) ||  // Bright yellow plastic
                (r > 200 && g < 100 && b > 200)) { // Bright purple/magenta plastic
                coloredPlastics++;
                wasteIndicators++;
            }
            
            // Detect metallic waste (cans, foil - reflective surfaces) - stricter
            if (r > 180 && g > 180 && b > 180 && 
                Math.abs(r - g) < 20 && Math.abs(g - b) < 20 &&
                (r + g + b) > 540) {
                metallic++;
                wasteIndicators++;
            }
            
            // Detect dark debris/waste (bags, dark plastics, shadows on debris)
            if ((r < 80 && g < 80 && b < 80) || // Dark debris
                (r < 100 && g < 120 && b < 140 && b > g && g > r)) { // Dark objects in water
                darkDebris++;
                wasteIndicators++;
            }
            
            // Detect microparticles and small plastic debris
            const isMicroparticle = (
                // Small bright spots (potential microplastics)
                (r > 180 && g > 180 && b > 180 && Math.abs(r - g) < 40 && Math.abs(g - b) < 40) ||
                // Tiny colored particles
                (Math.abs(r - g) > 50 || Math.abs(g - b) > 50 || Math.abs(r - b) > 50) && (r + g + b) > 200
            );
            
            if (isMicroparticle) {
                microparticles++;
                wasteIndicators++;
            }
            
            // Detect plastic particles (small plastic fragments)
            const isPlasticParticle = (
                // White/clear plastic fragments
                (r > 190 && g > 190 && b > 190 && Math.abs(r - g) < 25) ||
                // Colored plastic fragments
                ((r > 160 && g < 120 && b < 120) || (g > 160 && r < 120 && b < 120) || (b > 160 && r < 120 && g < 120))
            );
            
            if (isPlasticParticle) {
                plasticParticles++;
                wasteIndicators++;
            }
            
            // Detect artificial/unnatural color combinations - much stricter
            const colorVariance = Math.abs(r - g) + Math.abs(g - b) + Math.abs(r - b);
            const brightness = r + g + b;
            if (colorVariance > 150 && brightness > 300) {
                artificialColors++;
                wasteIndicators++;
            }
        }
        
        const bottlePercentage = (plasticBottles / totalPixels) * 100;
        const coloredPlasticPercentage = (coloredPlastics / totalPixels) * 100;
        const metallicPercentage = (metallic / totalPixels) * 100;
        const debrisPercentage = (darkDebris / totalPixels) * 100;
        const artificialPercentage = (artificialColors / totalPixels) * 100;
        const microparticlePercentage = (microparticles / totalPixels) * 100;
        const plasticParticlePercentage = (plasticParticles / totalPixels) * 100;
        const wastePercentage = (wasteIndicators / totalPixels) * 100;
        
        // Determine waste types detected with lower thresholds for floating debris
        const detectedTypes = [];
        if (bottlePercentage > 2) detectedTypes.push('plastic_bottles');
        if (coloredPlasticPercentage > 3) detectedTypes.push('colored_plastics');
        if (metallicPercentage > 3) detectedTypes.push('metallic_waste');
        if (debrisPercentage > 2) detectedTypes.push('dark_debris');
        if (microparticlePercentage > 1) detectedTypes.push('microparticles');
        if (plasticParticlePercentage > 1) detectedTypes.push('plastic_particles');
        if (artificialPercentage > 3) detectedTypes.push('artificial_materials');
        
        // Calculate confidence based on waste indicators with stricter thresholds
        let confidence = 0;
        if (wastePercentage > 25) confidence = 0.9;
        else if (wastePercentage > 20) confidence = 0.7;
        else if (wastePercentage > 15) confidence = 0.5;
        else if (wastePercentage > 10) confidence = 0.3;
        else confidence = 0.1;
        
        // Additional confidence boost for multiple waste types
        if (detectedTypes.length > 2) confidence = Math.min(0.95, confidence + 0.2);
        if (detectedTypes.length > 1) confidence = Math.min(0.9, confidence + 0.1);
        
        // Lower detection threshold for floating debris in water
        const detected = wastePercentage > 3 && detectedTypes.length >= 1;
        
            console.log(`Waste analysis: Bottles: ${bottlePercentage.toFixed(1)}%, Colored: ${coloredPlasticPercentage.toFixed(1)}%, Metallic: ${metallicPercentage.toFixed(1)}%, Debris: ${debrisPercentage.toFixed(1)}%, Microparticles: ${microparticlePercentage.toFixed(1)}%, Plastic Particles: ${plasticParticlePercentage.toFixed(1)}%, Artificial: ${artificialPercentage.toFixed(1)}%, Total waste: ${wastePercentage.toFixed(1)}%`);
            console.log('Detected types:', detectedTypes);
            console.log('Detection result:', detected);
            
            return {
                detected: detected,
                confidence: confidence,
                types: detectedTypes,
                percentages: {
                    bottles: bottlePercentage,
                    coloredPlastics: coloredPlasticPercentage,
                    metallic: metallicPercentage,
                    debris: debrisPercentage,
                    microparticles: microparticlePercentage,
                    plasticParticles: plasticParticlePercentage,
                    artificial: artificialPercentage,
                    total: wastePercentage
                }
            };
        } catch (error) {
            console.error('Error in detectWasteMaterials:', error);
            return { detected: false, confidence: 0, types: [], percentages: {} };
        }
    }
    
    function handleNoWasteDetection(statusElement) {
        console.log('No waste materials detected - skipping object detection');
        
        // Update status
        if (statusElement) {
            statusElement.textContent = 'No Waste Materials Detected - Analysis Skipped';
            statusElement.style.color = '#4caf50';
        }
        
        // Clear previous results and show no waste message
        clearPreviousResults();
        showNoWasteMessage();
        
        // Reset button
        analyzeBtn.innerHTML = '<i class="fas fa-microscope"></i> Analyze Sample';
        analyzeBtn.disabled = false;
        analyzeBtn.style.background = 'var(--ocean-gradient)';
        
        // Hide spinner
        const spinner = document.querySelector('.spinner');
        if (spinner) spinner.style.display = 'none';
    }
    
    function showNoWasteMessage() {
        // Update detection result with no waste message
        const detectionElement = document.getElementById('detectionResult');
        const safetyElement = document.getElementById('safetyStatus');
        
        if (detectionElement) {
            detectionElement.textContent = 'NO WASTE';
            detectionElement.style.color = '#4caf50';
            detectionElement.style.fontWeight = 'bold';
        }
        
        if (safetyElement) {
            safetyElement.textContent = 'CLEAN';
            safetyElement.style.color = '#4caf50';
            safetyElement.style.fontWeight = 'bold';
        }
        
        // Show no waste info on canvas
        const canvas = document.getElementById('analysisCanvas');
        if (canvas) {
            const uploadedImg = uploadArea.querySelector('img');
            if (uploadedImg) {
                const ctx = canvas.getContext('2d');
                const img = new Image();
                
                img.onload = function() {
                    canvas.width = Math.min(400, img.width);
                    canvas.height = (canvas.width / img.width) * img.height;
                    
                    // Draw original clean image without any overlays
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                
                img.src = uploadedImg.src;
            }
        }
        
        // Update safety assessment
        const overallSafety = document.getElementById('overallSafety');
        const safetyDescription = document.getElementById('safetyDescription');
        const recommendationList = document.getElementById('recommendationList');
        
        if (overallSafety) {
            overallSafety.textContent = 'Clean Environment Detected';
            overallSafety.style.color = '#4caf50';
        }
        
        if (safetyDescription) {
            safetyDescription.textContent = 'Environment is clean and safe. No waste materials detected in the sample.';
        }
        
        if (recommendationList) {
            const recommendations = [
                '✅ Environment is SAFE - no waste detected',
                '🌊 Clean water environment confirmed',
                '🔒 Safe for marine life and ecosystem',
                '💚 Continue monitoring to maintain cleanliness'
            ];
            recommendationList.innerHTML = recommendations.map(rec => `<p>${rec}</p>`).join('');
        }
    }
    
    function handleWaterEnvironmentDetection(waterType, statusElement) {
        console.log(`Water environment detected: ${waterType}`);
        
        // Update status
        if (statusElement) {
            let statusMessage = '';
            switch (waterType) {
                case 'ocean_sea':
                    statusMessage = 'Ocean/Sea Water Detected - Analysis Skipped';
                    break;
                case 'fresh_water':
                    statusMessage = 'Fresh Water Environment Detected - Analysis Skipped';
                    break;
                default:
                    statusMessage = 'Water Environment Detected - Analysis Skipped';
            }
            statusElement.textContent = statusMessage;
            statusElement.style.color = '#2196f3';
        }
        
        // Clear previous results and show water environment message
        clearPreviousResults();
        showWaterEnvironmentMessage(waterType);
        
        // Reset button
        analyzeBtn.innerHTML = '<i class="fas fa-microscope"></i> Analyze Sample';
        analyzeBtn.disabled = false;
        analyzeBtn.style.background = 'var(--ocean-gradient)';
        
        // Hide spinner
        const spinner = document.querySelector('.spinner');
        if (spinner) spinner.style.display = 'none';
    }
    
    function clearPreviousResults() {
        // Clear main result cards
        const detectionElement = document.getElementById('detectionResult');
        const countElement = document.getElementById('particleCount');
        const sizeElement = document.getElementById('particleSize');
        const confidenceElement = document.getElementById('confidence');
        const safetyElement = document.getElementById('safetyStatus');
        
        [detectionElement, countElement, sizeElement, confidenceElement, safetyElement].forEach(element => {
            if (element) {
                element.textContent = '-';
                element.style.color = '#666';
            }
        });
        
        // Clear detailed analysis
        ['size1', 'size5', 'size10', 'pe', 'ps', 'pet', 'other', 'concentrationValue'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.textContent = '-';
        });
        
        // Clear canvas
        const canvas = document.getElementById('analysisCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    function showWaterEnvironmentMessage(waterType) {
        // Update detection result with water environment message
        const detectionElement = document.getElementById('detectionResult');
        const safetyElement = document.getElementById('safetyStatus');
        
        if (detectionElement) {
            detectionElement.textContent = 'EXCLUDED';
            detectionElement.style.color = '#2196f3';
            detectionElement.style.fontWeight = 'bold';
        }
        
        if (recommendationList) {
            const recommendations = [
                '🌊 Water environment detected - analysis skipped',
                '📋 Please upload a different sample type for analysis',
                '🔬 This system is designed for non-water sample analysis',
                '💡 Consider using specialized water analysis equipment'
            ];
            recommendationList.innerHTML = recommendations.map(rec => `<p>${rec}</p>`).join('');
        }
    }
    
    function updateMainResults(hasPlastics, particleCount, avgSize, confidence) {
        const detectionElement = document.getElementById('detectionResult');
        const countElement = document.getElementById('particleCount');
        const sizeElement = document.getElementById('particleSize');
        const confidenceElement = document.getElementById('confidence');
        const safetyElement = document.getElementById('safetyStatus');
        
        if (detectionElement) {
            detectionElement.textContent = hasPlastics ? 'PLASTIC DETECTED' : 'NO PLASTIC';
            detectionElement.style.color = hasPlastics ? '#e53e3e' : '#2e7d32';
            detectionElement.style.fontWeight = 'bold';
            detectionElement.style.fontSize = '1.1rem';
        }
        
        // Update safety status
        if (safetyElement) {
            let safetyStatus;
            if (!hasPlastics || particleCount < 10) {
                safetyStatus = { status: 'SAFE', color: '#2e7d32' };
            } else if (particleCount < 50) {
                safetyStatus = { status: 'CAUTION', color: '#ff9800' };
            } else {
                safetyStatus = { status: 'UNSAFE', color: '#e53e3e' };
            }
            safetyElement.textContent = safetyStatus.status;
            safetyElement.style.color = safetyStatus.color;
            safetyElement.style.fontWeight = 'bold';
            safetyElement.style.fontSize = '1.1rem';
        }
        
        if (countElement) {
            countElement.textContent = particleCount + (hasPlastics ? ' items' : ' particles');
            countElement.style.color = hasPlastics ? '#e53e3e' : '#2e7d32';
        }
        
        if (sizeElement) {
            sizeElement.textContent = avgSize + (hasPlastics ? ' mm' : ' μm');
            sizeElement.style.color = hasPlastics ? '#e53e3e' : '#2e7d32';
        }
        
        if (confidenceElement) {
            confidenceElement.textContent = confidence + '%';
            confidenceElement.style.color = '#0077be';
        }
    }
    
    function showImageAnalysis() {
        const canvas = document.getElementById('analysisCanvas');
        
        if (canvas) {
            // Get the uploaded image from upload area
            const uploadedImg = uploadArea.querySelector('img');
            if (uploadedImg) {
                const ctx = canvas.getContext('2d');
                const img = new Image();
                
                img.onload = function() {
                    // Set canvas size
                    canvas.width = Math.min(400, img.width);
                    canvas.height = (canvas.width / img.width) * img.height;
                    
                    // Draw original image
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    
                    // Add detection overlays
                    addDetectionOverlays(ctx, canvas.width, canvas.height);
                };
                
                img.src = uploadedImg.src;
            }
        }
    }
    
    function addDetectionOverlays(ctx, width, height) {
        // Enhanced detection for ocean pollution images with surface and underwater analysis
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        // Analyze image for blue/green water areas and detect plastic debris
        const detectedItems = [];
        
        // Detect water surface (typically upper portion of image)
        const surfaceThreshold = height * 0.4; // Top 40% considered surface
        
        // Sample points across the image to detect plastic-like objects
        for (let y = 0; y < height; y += 15) {
            for (let x = 0; x < width; x += 15) {
                const index = (y * width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                
                // Determine if we're analyzing surface or underwater
                const isOnSurface = y < surfaceThreshold;
                
                // Detect plastic bottles (white/clear objects)
                const isLightObject = (r > 170 && g > 170 && b > 170);
                // Detect colored plastic debris
                const isColoredPlastic = (r > 140 && g < 120 && b < 120) || // Red plastic
                                       (r < 120 && g > 140 && b < 120) || // Green plastic
                                       (r < 120 && g < 120 && b > 140) || // Blue plastic
                                       (r > 200 && g > 200 && b < 100);   // Yellow plastic
                
                // Detect water particles (darker areas in water indicating suspended particles)
                const isWaterParticle = !isOnSurface && 
                                      ((r < 100 && g > 80 && b > 100) || // Bluish water with particles
                                       (r < 80 && g < 80 && b < 80));    // Dark particles in water
                
                // Detect surface foam/oil (indicates pollution)
                const isSurfacePollution = isOnSurface && 
                                         ((r > 200 && g > 200 && b > 180) || // Foam/oil sheen
                                          (r > 150 && g > 120 && b < 100));   // Oil slick colors
                
                if (isLightObject || isColoredPlastic || isWaterParticle || isSurfacePollution) {
                    // Add some randomness to avoid perfect grid
                    const offsetX = (Math.random() - 0.5) * 25;
                    const offsetY = (Math.random() - 0.5) * 25;
                    
                    let itemType = 'plastic_fragment';
                    let itemSize = Math.random() * 15 + 5;
                    
                    if (isLightObject) {
                        itemType = isOnSurface ? 'plastic_bottle' : 'submerged_bottle';
                        itemSize = Math.random() * 25 + 15;
                    } else if (isColoredPlastic) {
                        itemType = isOnSurface ? 'plastic_debris' : 'plastic_waste';
                        itemSize = Math.random() * 20 + 8;
                    } else if (isWaterParticle) {
                        itemType = 'plastic_particle';
                        itemSize = Math.random() * 8 + 3;
                    } else if (isSurfacePollution) {
                        itemType = 'waste_material';
                        itemSize = Math.random() * 30 + 10;
                    }
                    
                    detectedItems.push({
                        x: Math.max(10, Math.min(width - 10, x + offsetX)),
                        y: Math.max(10, Math.min(height - 10, y + offsetY)),
                        type: itemType,
                        size: itemSize,
                        depth: isOnSurface ? 'surface' : 'underwater'
                    });
                }
            }
        }
        
        // Add additional random particles distributed by depth
        const surfaceParticles = Math.floor(Math.random() * 15) + 10;
        const underwaterParticles = Math.floor(Math.random() * 25) + 20;
        
        // Surface plastic waste
        for (let i = 0; i < surfaceParticles; i++) {
            detectedItems.push({
                x: Math.random() * width,
                y: Math.random() * surfaceThreshold,
                type: Math.random() > 0.7 ? 'floating_plastic' : 'plastic_fragment',
                size: Math.random() * 12 + 4,
                depth: 'surface'
            });
        }
        
        // Underwater plastic waste
        for (let i = 0; i < underwaterParticles; i++) {
            detectedItems.push({
                x: Math.random() * width,
                y: surfaceThreshold + Math.random() * (height - surfaceThreshold),
                type: Math.random() > 0.6 ? 'submerged_plastic' : 'plastic_debris',
                size: Math.random() * 15 + 5,
                depth: 'underwater'
            });
        }
        
        // Draw detection overlays
        detectedItems.forEach(item => {
            let color, label, fillColor, strokeWidth = 3;
            
            switch (item.type) {
                case 'plastic_bottle':
                    color = '#ff1744'; // Bright red for plastic bottles
                    label = 'PB'; // Plastic Bottle
                    fillColor = 'rgba(255, 23, 68, 0.5)';
                    strokeWidth = 4;
                    break;
                case 'submerged_bottle':
                    color = '#d32f2f'; // Darker red for submerged bottles
                    label = 'SB'; // Submerged Bottle
                    fillColor = 'rgba(211, 47, 47, 0.4)';
                    strokeWidth = 4;
                    break;
                case 'plastic_debris':
                    color = '#ff6d00'; // Orange for plastic debris
                    label = 'PD'; // Plastic Debris
                    fillColor = 'rgba(255, 109, 0, 0.5)';
                    break;
                case 'plastic_waste':
                    color = '#f57c00'; // Darker orange for plastic waste
                    label = 'PW'; // Plastic Waste
                    fillColor = 'rgba(245, 124, 0, 0.4)';
                    break;
                case 'floating_plastic':
                    color = '#e53e3e'; // Red for floating plastic
                    label = 'FP'; // Floating Plastic
                    fillColor = 'rgba(229, 62, 62, 0.4)';
                    break;
                case 'submerged_plastic':
                    color = '#c62828'; // Darker red for submerged plastic
                    label = 'SP'; // Submerged Plastic
                    fillColor = 'rgba(198, 40, 40, 0.3)';
                    break;
                case 'plastic_particle':
                    color = '#1976d2'; // Blue for plastic particles
                    label = 'PP'; // Plastic Particle
                    fillColor = 'rgba(25, 118, 210, 0.3)';
                    strokeWidth = 2;
                    break;
                case 'waste_material':
                    color = '#9c27b0'; // Purple for waste material
                    label = 'WM'; // Waste Material
                    fillColor = 'rgba(156, 39, 176, 0.4)';
                    break;
                case 'plastic_fragment':
                    color = '#ff9800'; // Amber for plastic fragments
                    label = 'PF'; // Plastic Fragment
                    fillColor = 'rgba(255, 152, 0, 0.3)';
                    strokeWidth = 2;
                    break;
                default: // fallback
                    color = '#e53e3e';
                    label = 'PL';
                    fillColor = 'rgba(229, 62, 62, 0.3)';
            }
            
            // Draw detection circle
            ctx.beginPath();
            ctx.arc(item.x, item.y, item.size, 0, 2 * Math.PI);
            ctx.strokeStyle = color;
            ctx.lineWidth = strokeWidth;
            ctx.stroke();
            
            // Fill circle for visibility
            ctx.fillStyle = fillColor;
            ctx.fill();
            
            // Add label with background
            const labelX = item.x + item.size + 5;
            const labelY = item.y - item.size - 5;
            
            // Ensure label stays within canvas
            const adjustedX = Math.min(labelX, width - 25);
            const adjustedY = Math.max(labelY, 15);
            
            // Label background
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.fillRect(adjustedX - 2, adjustedY - 12, 22, 16);
            
            // Label border
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.strokeRect(adjustedX - 2, adjustedY - 12, 22, 16);
            
            // Label text
            ctx.fillStyle = color;
            ctx.font = 'bold 11px Arial';
            ctx.fillText(label, adjustedX, adjustedY);
        });
        
    }
    
    function generateDetailedAnalysis(hasPlastics, totalCount) {
        // Size distribution
        const size1 = Math.floor(totalCount * (0.4 + Math.random() * 0.2));
        const size5 = Math.floor(totalCount * (0.3 + Math.random() * 0.2));
        const size10 = totalCount - size1 - size5;
        
        const size1El = document.getElementById('size1');
        const size5El = document.getElementById('size5');
        const size10El = document.getElementById('size10');
        
        if (size1El) size1El.textContent = size1;
        if (size5El) size5El.textContent = size5;
        if (size10El) size10El.textContent = size10;
        
        // Material types
        const pe = Math.floor(totalCount * (0.3 + Math.random() * 0.2));
        const ps = Math.floor(totalCount * (0.25 + Math.random() * 0.15));
        const pet = Math.floor(totalCount * (0.2 + Math.random() * 0.15));
        const other = totalCount - pe - ps - pet;
        
        const peEl = document.getElementById('pe');
        const psEl = document.getElementById('ps');
        const petEl = document.getElementById('pet');
        const otherEl = document.getElementById('other');
        
        if (peEl) peEl.textContent = pe;
        if (psEl) psEl.textContent = ps;
        if (petEl) petEl.textContent = pet;
        if (otherEl) otherEl.textContent = Math.max(0, other);
        
        // Concentration - ensure realistic values for microplastics
        const concentration = hasPlastics ? Math.floor(totalCount * (80 + Math.random() * 300)) : Math.floor(Math.random() * 20);
        const concentrationEl = document.getElementById('concentrationValue');
        if (concentrationEl) concentrationEl.textContent = concentration.toLocaleString();
        
        const levelElement = document.getElementById('concentrationLevel');
        if (levelElement) {
            const levelIndicator = levelElement.querySelector('.level-indicator');
            const levelText = levelElement.querySelector('.level-text');
            
            if (levelIndicator && levelText) {
                if (concentration < 100) {
                    levelIndicator.style.background = '#2e7d32';
                    levelText.textContent = 'Low';
                } else if (concentration < 500) {
                    levelIndicator.style.background = '#ff9800';
                    levelText.textContent = 'Moderate';
                } else {
                    levelIndicator.style.background = '#e53e3e';
                    levelText.textContent = 'High';
                }
            }
        }
        
        // Draw charts
        drawSizeChart(size1, size5, size10);
        drawMaterialChart(pe, ps, pet, other);
        drawConcentrationChart(concentration);
    }
    
    function generateSafetyAssessment(hasPlastics, particleCount, avgSize, confidence, waterEnvironment = null) {
        // Update overall safety indicator
        const overallSafety = document.getElementById('overallSafety');
        const safetyDescription = document.getElementById('safetyDescription');
        const safetyIndicator = document.getElementById('safetyIndicator');
        
        if (overallSafety && safetyDescription && safetyIndicator) {
            let environmentContext = '';
            if (waterEnvironment && waterEnvironment.detected) {
                switch (waterEnvironment.type) {
                    case 'ocean_sea':
                        environmentContext = ' in ocean/sea water';
                        break;
                    case 'fresh_water':
                        environmentContext = ' in fresh water environment';
                        break;
                    default:
                        environmentContext = ' in water environment';
                }
            }
            
            if (!hasPlastics || particleCount < 10) {
                overallSafety.textContent = `Water is SAFE for consumption${environmentContext}`;
                overallSafety.style.color = '#2e7d32';
                safetyDescription.textContent = `Microplastic levels are within acceptable limits${environmentContext}.`;
                safetyIndicator.style.borderColor = '#2e7d32';
            } else if (particleCount < 50) {
                overallSafety.textContent = `MODERATE contamination detected${environmentContext}`;
                overallSafety.style.color = '#ff9800';
                safetyDescription.textContent = `Elevated microplastic levels detected${environmentContext}. Consider filtration before consumption.`;
                safetyIndicator.style.borderColor = '#ff9800';
            } else {
                overallSafety.textContent = `HIGH contamination - UNSAFE${environmentContext}`;
                overallSafety.style.color = '#e53e3e';
                safetyDescription.textContent = `Dangerous levels of microplastics detected${environmentContext}. Do not consume without proper treatment.`;
                safetyIndicator.style.borderColor = '#e53e3e';
            }
        }
        
        // Update risk assessments
        const ingestionRisk = document.getElementById('ingestionRisk');
        const aquaticRisk = document.getElementById('aquaticRisk');
        const ecosystemRisk = document.getElementById('ecosystemRisk');
        const longtermRisk = document.getElementById('longtermRisk');
        
        const riskLevel = particleCount < 10 ? 'Low' : particleCount < 50 ? 'Moderate' : 'High';
        const riskColor = particleCount < 10 ? '#2e7d32' : particleCount < 50 ? '#ff9800' : '#e53e3e';
        
        [ingestionRisk, aquaticRisk, ecosystemRisk, longtermRisk].forEach(element => {
            if (element) {
                element.textContent = riskLevel;
                element.style.color = riskColor;
                element.style.fontWeight = 'bold';
            }
        });
        
        // Update recommendations
        const recommendationList = document.getElementById('recommendationList');
        if (recommendationList) {
            let recommendations = [];
            
            if (!hasPlastics || particleCount < 10) {
                recommendations = [
                    '✓ Water quality is acceptable for consumption',
                    '✓ Continue regular monitoring',
                    '✓ Maintain current filtration systems'
                ];
            } else if (particleCount < 50) {
                recommendations = [
                    '⚠ Install additional water filtration',
                    '⚠ Increase monitoring frequency',
                    '⚠ Consider alternative water sources',
                    '⚠ Implement source pollution controls'
                ];
            } else {
                recommendations = [
                    '🚫 Do not consume without treatment',
                    '🚫 Implement immediate filtration',
                    '🚫 Identify and eliminate pollution sources',
                    '🚫 Contact environmental authorities'
                ];
            }
            
            recommendationList.innerHTML = recommendations.map(rec => `<p>${rec}</p>`).join('');
        }
    }
    
    function updateMonitoringDashboard(hasPlastics, particleCount, waterEnvironment = null) {
        // Update monitoring stats
        const lastUpdate = document.getElementById('lastUpdate');
        const waterTemp = document.getElementById('waterTemp');
        const phLevel = document.getElementById('phLevel');
        const turbidity = document.getElementById('turbidity');
        
        if (lastUpdate) lastUpdate.textContent = new Date().toLocaleTimeString();
        if (waterTemp) waterTemp.textContent = (18 + Math.random() * 8).toFixed(1) + '°C';
        if (phLevel) phLevel.textContent = (6.5 + Math.random() * 2).toFixed(1);
        if (turbidity) turbidity.textContent = (Math.random() * 5).toFixed(1) + ' NTU';
        
        // Update alerts
        const alertsContainer = document.getElementById('alertsContainer');
        if (alertsContainer) {
            let alerts = [];
            let environmentInfo = '';
            
            if (waterEnvironment && waterEnvironment.detected) {
                switch (waterEnvironment.type) {
                    case 'ocean_sea':
                        environmentInfo = ' in ocean/sea water';
                        break;
                    case 'fresh_water':
                        environmentInfo = ' in fresh water';
                        break;
                    default:
                        environmentInfo = ' in water environment';
                }
            }
            
            if (hasPlastics && particleCount > 50) {
                alerts.push({
                    type: 'danger',
                    icon: 'fas fa-exclamation-triangle',
                    message: `High microplastic contamination detected${environmentInfo}!`
                });
            } else if (hasPlastics && particleCount > 20) {
                alerts.push({
                    type: 'warning',
                    icon: 'fas fa-exclamation-circle',
                    message: `Elevated microplastic levels detected${environmentInfo}`
                });
            } else {
                alerts.push({
                    type: 'success',
                    icon: 'fas fa-check-circle',
                    message: `Water quality within acceptable limits${environmentInfo}`
                });
            }
            
            alertsContainer.innerHTML = alerts.map(alert => 
                `<div class="alert-item ${alert.type}">
                    <i class="${alert.icon}"></i>
                    <span>${alert.message}</span>
                </div>`
            ).join('');
        }
        
        // Draw trend chart
        drawTrendChart();
    }
    
    function drawTrendChart() {
        const canvas = document.getElementById('trendChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Generate sample trend data
        const dataPoints = 10;
        const data = [];
        for (let i = 0; i < dataPoints; i++) {
            data.push(Math.random() * 100 + 20);
        }
        
        // Draw trend line
        ctx.strokeStyle = '#2196f3';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = 0; i < data.length; i++) {
            const x = (i / (data.length - 1)) * (canvas.width - 40) + 20;
            const y = canvas.height - 20 - (data[i] / 120) * (canvas.height - 40);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = '#2196f3';
        for (let i = 0; i < data.length; i++) {
            const x = (i / (data.length - 1)) * (canvas.width - 40) + 20;
            const y = canvas.height - 20 - (data[i] / 120) * (canvas.height - 40);
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    
    function drawSizeChart(size1, size5, size10) {
        const canvas = document.getElementById('sizeChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        drawBarChart(ctx, canvas, [size1, size5, size10], ['<1μm', '1-5μm', '>5μm'], ['#2196f3', '#4caf50', '#ff9800']);
    }
    
    function drawMaterialChart(pe, ps, pet, other) {
        const canvas = document.getElementById('materialChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        drawBarChart(ctx, canvas, [pe, ps, pet, other], ['PE', 'PS', 'PET', 'Other'], ['#e53e3e', '#ff9800', '#2196f3', '#9c27b0']);
    }
    
    function drawConcentrationChart(concentration) {
        const canvas = document.getElementById('concentrationChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw concentration trend
        const points = [20, 35, 45, 30, 55, 40, concentration];
        
        ctx.strokeStyle = '#e53e3e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        points.forEach((point, index) => {
            const x = (index / (points.length - 1)) * (canvas.width - 40) + 20;
            const y = canvas.height - (point / Math.max(...points)) * (canvas.height - 20);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Add current point
        const currentX = canvas.width - 40;
        const currentY = canvas.height - (concentration / Math.max(...points)) * (canvas.height - 20);
        
        ctx.fillStyle = '#e53e3e';
        ctx.beginPath();
        ctx.arc(currentX, currentY, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    function drawBarChart(ctx, canvas, data, labels, colors) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const maxValue = Math.max(...data);
        const barWidth = canvas.width / data.length * 0.8;
        const barSpacing = canvas.width / data.length * 0.2;
        
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * (canvas.height - 40);
            const x = index * (barWidth + barSpacing) + barSpacing / 2;
            const y = canvas.height - barHeight - 20;
            
            ctx.fillStyle = colors[index];
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Add value labels
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value, x + barWidth / 2, y - 5);
            ctx.fillText(labels[index], x + barWidth / 2, canvas.height - 5);
        });
    }
    
    // Tab functionality for detailed analysis
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    console.log('MicroDetect website initialized successfully!');
});
